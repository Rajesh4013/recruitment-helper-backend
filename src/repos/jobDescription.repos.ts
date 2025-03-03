import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class JobDescriptionRepository {
    async createJobDescription(data: Prisma.JobDescriptionCreateInput) {
        console.log('JobDescriptionRepository.createJobDescription data:', data);
        return prisma.jobDescription.create({
            data,
        });
    }

    async getJobDescriptionById(jobDescriptionId: number) {
        return prisma.jobDescription.findUnique({
            where: { JobDescriptionID: jobDescriptionId },
            include: {
                ModeOfWork: {
                    select: { ModeOfWorkName: true }
                },
                Education: {
                    select: { EducationName: true }
                },
                JobType: {
                    select: { JobTypeName: true }
                },
                NoticePeriod: {
                    select: { NoticePeriodName: true }
                }
            }
        });
    }
}
