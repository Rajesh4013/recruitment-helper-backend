import { UpdateTrackerRepository } from '../repos/updateTracker.repos.js';
import { Prisma } from '@prisma/client';
import { CreateUpdateTracker } from '../types/requests.types.js';

class UpdateTrackerService {
    private repository: UpdateTrackerRepository;

    constructor() {
        this.repository = new UpdateTrackerRepository();
    }

    async createUpdateTracker(id: number, data: CreateUpdateTracker) {
        // console.log(data);
        // console.log(data.level2PanelInterviewSlots);
        const updateTracker: Prisma.UpdateTrackerCreateInput = {
            JobDescriptionID: id,
            Employee_UpdateTracker_EmployeeIDToEmployee: {
                connect: {
                    EmployeeID: data.employeeID
                }
            },
            Employee_UpdateTracker_Level1PanelIDToEmployee: data.level1InterviewPanelID
                ? {
                    connect: {
                        EmployeeID: data.level1InterviewPanelID
                    }
                }
                : undefined,
            Employee_UpdateTracker_Level2PanelIDToEmployee: data.level2InterviewPanelID
                ? {
                    connect: {
                        EmployeeID: data.level2InterviewPanelID
                    }
                }
                : undefined,
            BudgetRanges: {
                connect: {
                    BudgetID: data.budgetID
                }
            },
            Priority: data.priorityID
                ? {
                    connect: {
                        PriorityID: data.priorityID
                    }
                }
                : undefined,
            ExpectedTimeline: data.expectedTimeline,
            Level2PanelInterviewSlots: data.level2PanelInterviewSlots,
            Level1PanelInterviewSlots: data.level1PanelInterviewSlots,
        };
        // console.log(updateTracker);
        return this.repository.createUpdateTracker(updateTracker);
    }
}

export default new UpdateTrackerService();