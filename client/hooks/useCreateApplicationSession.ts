import {
    generateRequestId,
    getCurrentTimestamp,
    MessageSigner,
    NitroliteRPC,
    RPCMethod,
} from '@erc7824/nitrolite';
import { useCallback } from 'react';
import { Address, Hex } from 'viem';
import { useSessionKey } from './useSessionKey';

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

export const useCreateApplicationSession = (ws: WebSocket | null, signer: MessageSigner) => {
  const { signer: counterpartySigner } = useSessionKey(process.env.NEXT_PUBLIC_SESSION_2_KEY_PRIVATE_KEY as Hex);

  const createApplicationSession = useCallback(
    async (myAccount: Address, auction: Auction) => {
    console.log("myAccount = ", myAccount);
    console.log("auction = ", JSON.stringify(auction));
    console.log("ws = ", ws);
    console.log("signer = ", signer);

      if (!ws || ws.readyState !== WebSocket.OPEN) {
        throw new Error('WebSocket is not connected');
      }

    //   if (auction.participants.length < 2) {
    //     throw new Error('Auction must have at least two participants');
    //   }

      // Get participant addresses from publicKey fields
      //const participant1 = auction.participants[0];
      const participant2 = auction.participants[0];

      if (!participant2.user.publicKey) {
        throw new Error('Participant public keys are not defined');
      }

      //const participant1Address = participant1.user.publicKey as Address;
      const participant2Address = participant2.user.publicKey as Address;

      try {
        // Define the application parameters
        const appDefinition = {
          protocol: 'nitroliterpc',
          participants: [myAccount, participant2Address],
          weights: [100, 0], // Weight distribution for consensus (user has full control)
          quorum: 100, // Required consensus percentage
          challenge: 0, // Challenge period
          nonce: Date.now(), // Unique identifier
          //auctionId: auction.id,
          //participantUsernames: auction.participants.map(p => p.user.username),
        };

        // Define allocations using allocation fields from auctionDrops
        const allocations = [
          {
            participant: myAccount,
            asset: 'usdc',
            amount: '0.0001', // Default for connected user
          },
        //   {
        //     participant: participant1Address,
        //     asset: 'usdc',
        //     amount: participant1.user.allocation,
        //   },
          {
            participant: participant2Address,
            asset: 'usdc',
            amount: participant2.user.allocation,
          },
        ];

        const params = [
          {
            definition: appDefinition,
            allocations: allocations,
          },
        ];

        console.log("Created session params.");

        // Create and sign the session request
        const requestId = generateRequestId();
        const timestamp = getCurrentTimestamp();

        const request = NitroliteRPC.createRequest(requestId, RPCMethod.CreateAppSession, params, timestamp);
        const signedRequest = await NitroliteRPC.signRequestMessage(request, signer);

        //workaround        
        const counterpartyRequest = NitroliteRPC.createRequest(requestId, RPCMethod.CreateAppSession, params, timestamp);
        const counterpartySignedRequest = await NitroliteRPC.signRequestMessage(counterpartyRequest, counterpartySigner);

        // if (!signedRequest?.sig?.[0]) {
        //   throw new Error('Failed to sign the application session request');
        // }

        if (!signedRequest?.sig?.[0] || !counterpartySignedRequest?.sig?.[0]) {
            throw new Error('Failed to sign the application session request, by some participant');
        }

        signedRequest.sig = [signedRequest.sig[0], counterpartySignedRequest.sig[0]];
        const signedMessage = JSON.stringify(signedRequest);

        // Send the signed message to the ClearNode
        ws.send(signedMessage);
      } catch (error) {
        console.error('Error creating application session:', error);
        throw new Error('Failed to create application session');
      }
    },
    [signer, ws]
  );

  return { createApplicationSession };
};