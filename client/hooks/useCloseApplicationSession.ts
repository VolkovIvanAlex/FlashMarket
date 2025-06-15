import { CloseAppSessionRequest, createCloseAppSessionMessage, MessageSigner } from '@erc7824/nitrolite';
import { useCallback } from 'react';
import { Address, Hex } from 'viem';

interface AuctionParticipant {
  id: string;
  user: {
    id: string;
    email: string;
    username: string;
    avatarUrl: string;
    publicKey: string | undefined;
    allocation: string;
  };
  queueIndex: number;
  joinedAt: string;
}

interface Auction {
  id: number;
  title: string;
  status: string;
  image: string;
  currentBid: number;
  startingBid: number;
  timeLeft: string;
  bidders: number;
  totalBids: number;
  description: string;
  participants: AuctionParticipant[];
}

export const useCloseApplicationSession = (ws: WebSocket | null, signer: MessageSigner) => {
  const closeApplicationSession = useCallback(
    async (myAccount: Address, receiverIndex: 0 | 1, auction: Auction) => {
      if (!ws || ws.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket is not connected');
      }

      // Validate participants
      const validParticipants = auction.participants.filter(p => p.user.publicKey);
      if (validParticipants.length === 0 && !myAccount) {
        throw new Error('At least one participant or myAccount must be defined');
      }

      try {
        const appId = window.localStorage.getItem('app_session_id');
        if (!appId) {
          throw new Error('Application ID is required to close the session.');
        }

        // Define myAccount's default allocation
        const myAccountAllocation = '0.0001';

        // Calculate total allocation and find participant with highest allocation
        let highestAllocation = parseFloat(myAccountAllocation);
        let highestAllocationParticipant: { address: Address; username?: string } = {
          address: myAccount,
          username: 'Connected User',
        };

        let totalAllocation = parseFloat(myAccountAllocation);

        validParticipants.forEach(participant => {
          const allocation = parseFloat(participant.user.allocation);
          if (isNaN(allocation)) {
            console.warn(`Invalid allocation for participant ${participant.user.username}: ${participant.user.allocation}`);
            return;
          }
          totalAllocation += allocation;
          if (allocation > highestAllocation) {
            highestAllocation = allocation;
            highestAllocationParticipant = {
              address: participant.user.publicKey! as Address,
              username: participant.user.username,
            };
          }
        });

        // Format total allocation as string with same precision
        const totalAllocationStr = totalAllocation.toFixed(6).replace(/\.?0+$/, '');

        // Create allocations: only the highest allocation participant gets the total sum
        const allocations = [
          {
            participant: myAccount,
            asset: 'usdc',
            amount: myAccount.toLowerCase() === highestAllocationParticipant.address.toLowerCase() ? totalAllocationStr : '0',
          },
          ...validParticipants.map(participant => ({
            participant: participant.user.publicKey! as Address,
            asset: 'usdc',
            amount: participant.user.publicKey!.toLowerCase() === highestAllocationParticipant.address.toLowerCase() ? totalAllocationStr : '0',
          })),
        ].filter((alloc, index, self) => 
          // Remove duplicates by participant address
          index === self.findIndex(a => a.participant.toLowerCase() === alloc.participant.toLowerCase())
        );

        // Create the close request
        const closeRequest: CloseAppSessionRequest = {
          app_session_id: appId as Hex,
          allocations,
        };

        // Create the signed message
        const signedMessage = await createCloseAppSessionMessage(signer, [closeRequest]);

        ws.send(signedMessage);
      } catch (error) {
        console.error('Error closing application session:', error);
        throw new Error('Failed to close application session');
      }
    },
    [signer, ws]
  );

  return { closeApplicationSession };
};