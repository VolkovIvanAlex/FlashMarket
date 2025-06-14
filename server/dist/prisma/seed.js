"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const users = await prisma.user.createMany({
        data: [
            { email: 'alice@example.com', username: 'alice' },
            { email: 'bob@example.com', username: 'bob' },
            { email: 'carol@example.com', username: 'carol' },
        ],
    });
    const userList = await prisma.user.findMany();
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const drops = await prisma.drop.createMany({
        data: [
            {
                title: 'Live Random Drop',
                type: 'RANDOM',
                supply: 100,
                status: 'LIVE',
                startTime: now,
                endTime: oneHourLater,
            },
            {
                title: 'Live FCFS Drop',
                type: 'FCFS',
                price: 20,
                supply: 2,
                status: 'LIVE',
                startTime: now,
                endTime: oneHourLater,
            },
            {
                title: 'Live Auction Drop',
                type: 'AUCTION',
                supply: 3,
                status: 'LIVE',
                startTime: now,
                endTime: oneHourLater,
            },
            {
                title: 'Closed FCFS Drop',
                type: 'FCFS',
                price: 50,
                supply: 5,
                status: 'ENDED',
                startTime: oneHourAgo,
                endTime: now,
            },
            {
                title: 'Closed Auction Drop',
                type: 'AUCTION',
                supply: 3,
                status: 'ENDED',
                startTime: oneHourAgo,
                endTime: now,
            },
        ],
    });
    const dropList = await prisma.drop.findMany();
    await prisma.participation.createMany({
        data: [
            {
                userId: userList[0].id,
                dropId: dropList[1].id,
                queueIndex: 0,
            },
            {
                userId: userList[1].id,
                dropId: dropList[1].id,
                queueIndex: 1,
            },
        ],
    });
    const auctionDropId = dropList[2].id;
    const auctionParticipants = await Promise.all([
        prisma.participation.create({
            data: {
                userId: userList[0].id,
                dropId: auctionDropId,
                queueIndex: 0,
            },
        }),
        prisma.participation.create({
            data: {
                userId: userList[2].id,
                dropId: auctionDropId,
                queueIndex: 1,
            },
        }),
    ]);
    await prisma.bid.createMany({
        data: [
            {
                participationId: auctionParticipants[0].id,
                amount: 120,
            },
            {
                participationId: auctionParticipants[1].id,
                amount: 150,
            },
        ],
    });
    await prisma.participation.create({
        data: {
            userId: userList[1].id,
            dropId: dropList[3].id,
            queueIndex: 0,
        },
    });
    const closedAuctionPart = await prisma.participation.create({
        data: {
            userId: userList[2].id,
            dropId: dropList[4].id,
            queueIndex: 0,
        },
    });
    await prisma.bid.create({
        data: {
            participationId: closedAuctionPart.id,
            amount: 180,
        },
    });
    console.log('✅ Seed completed.');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map