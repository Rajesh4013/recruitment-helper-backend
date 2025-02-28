import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class JobDescriptionRepository {
    async createJobDescription(data: Prisma.JobDescriptionCreateInput) {
        console.log('JobDescriptionRepository.createJobDescription data:', data);
        return prisma.jobDescription.create({
            data,
        });
    }
}
