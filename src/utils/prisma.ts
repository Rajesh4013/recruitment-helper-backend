import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL
});

process.on('beforeExit', async () => {
    await prisma.$disconnect();
});

export { prisma };