import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class UpdateTrackerRepository {
    async createUpdateTracker(data: Prisma.UpdateTrackerCreateInput) {
        console.log('UpdateTrackerRepository.createUpdateTracker data:', data);
        return prisma.updateTracker.create({
            data,
        });
    }

    async getUpdateTrackerByJobDescriptionId(jobDescriptionId: number) {
        return prisma.updateTracker.findMany({
            where: { JobDescriptionID: jobDescriptionId },
            include: {
                Employee_UpdateTracker_EmployeeIDToEmployee: true,
                Employee_UpdateTracker_Level1PanelIDToEmployee: true,
                Employee_UpdateTracker_Level2PanelIDToEmployee: true,
                BudgetRanges: {
                    select: { BudgetName: true }
                },
                Priority: {
                    select: { PriorityName: true }
                }
            }
        });
    }

    async getUpdateTrackerIdByJobDescriptionId(jobDescriptionId: number) {
        return prisma.updateTracker.findFirst({
            where: { JobDescriptionID: jobDescriptionId },
            select: {
                UpdateTrackerID: true
            }
        });
    }

    async updateUpdateTracker(jobDescriptionId: number, employeeId: number, data: Prisma.UpdateTrackerUpdateInput) {
        return prisma.updateTracker.update({
            where: { EmployeeID_JobDescriptionID: { JobDescriptionID: jobDescriptionId, EmployeeID: employeeId } },
            data
        });
    }
}
