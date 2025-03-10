import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class UpdateTrackerRepository {

    async getLatestEditsOfUpdateTracker(jobDescriptionId: number) {
        return prisma.updateTracker.findFirst({
            where: { JobDescriptionID: jobDescriptionId },
            orderBy: { UpdatedAt: 'desc' }
        });
    }

    async createUpdateTracker(data: Prisma.UpdateTrackerCreateInput) {
        console.log('UpdateTrackerRepository.createUpdateTracker data:', data);
        return prisma.updateTracker.create({
            data,
        });
    }

    async getUpdateTrackerByJobDescriptionId(jobDescriptionId: number) {
        return prisma.updateTracker.findMany({
            where: { JobDescriptionID: jobDescriptionId },
            orderBy: { UpdatedAt: 'desc' },
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
            orderBy: { UpdatedAt: 'desc' },
            select: {
                UpdateTrackerID: true
            }
        });
    }

    async updateUpdateTracker(jobDescriptionId: number, employeeId: number, data: Prisma.UpdateTrackerUpdateInput) {
        console.log(jobDescriptionId, employeeId, data);
        return prisma.updateTracker.update({
            where: { EmployeeID_JobDescriptionID: { JobDescriptionID: jobDescriptionId, EmployeeID: employeeId } },
            data
        });
    }
}
