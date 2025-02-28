import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class UpdateTrackerRepository {
    async createUpdateTracker(data: Prisma.UpdateTrackerCreateInput) {
        console.log('UpdateTrackerRepository.createUpdateTracker data:', data);
        return prisma.updateTracker.create({
            data,
        });
    }
}
