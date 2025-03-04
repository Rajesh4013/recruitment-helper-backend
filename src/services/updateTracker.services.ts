import { UpdateTrackerRepository } from '../repos/updateTracker.repos.js';
import { InterviewSlotRepository } from '../repos/interviewSlot.repos.js';
import { Prisma } from '@prisma/client';
import { CreateUpdateTracker } from '../types/requests.types.js';

class UpdateTrackerService {
    private repository: UpdateTrackerRepository;
    private interviewSlotRepository: InterviewSlotRepository;

    constructor() {
        this.repository = new UpdateTrackerRepository();
        this.interviewSlotRepository = new InterviewSlotRepository();
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

    async updateUpdateTracker(id: number, data: Prisma.UpdateTrackerUpdateInput) {
        return this.repository.updateUpdateTracker(id, data);
    }

    async getUpdateTrackersByJobDescriptionId(jobDescriptionId: number) {
        const updateTrackers = await this.repository.getUpdateTrackerByJobDescriptionId(jobDescriptionId);

        for (const tracker of updateTrackers) {
            if (tracker.Level1PanelInterviewSlots) {
                const slotIds = tracker.Level1PanelInterviewSlots.split(',').map(Number).filter(id => !isNaN(id));
                if (slotIds.length > 0) {
                    const slots = await this.interviewSlotRepository.getInterviewSlotNamesByIds(slotIds);
                    tracker.Level1PanelInterviewSlots = slots.map(slot => slot.InterviewSlotName).join(', ');
                } else {
                    tracker.Level1PanelInterviewSlots = '';
                }
            }
            if (tracker.Level2PanelInterviewSlots) {
                const slotIds = tracker.Level2PanelInterviewSlots.split(',').map(Number).filter(id => !isNaN(id));
                if (slotIds.length > 0) {
                    const slots = await this.interviewSlotRepository.getInterviewSlotNamesByIds(slotIds);
                    tracker.Level2PanelInterviewSlots = slots.map(slot => slot.InterviewSlotName).join(', ');
                } else {
                    tracker.Level2PanelInterviewSlots = '';
                }
            }
        }

        return updateTrackers;
    }
}

export default new UpdateTrackerService();