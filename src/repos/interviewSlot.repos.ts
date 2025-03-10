import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class InterviewSlotRepository {
    async getInterviewSlotNamesByIds(slotIds: number[]) {
        if (slotIds.length === 0) {
            return [];
        }
        return prisma.interviewSlots.findMany({
            where: {
                InterviewSlotID: { in: slotIds }
            },
            select: {
                InterviewSlotID: true,
                InterviewSlotName: true
            }
        });
    }
}
