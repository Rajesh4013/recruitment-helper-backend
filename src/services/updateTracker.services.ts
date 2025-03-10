import { UpdateTrackerRepository } from '../repos/updateTracker.repos.js';
import { InterviewSlotRepository } from '../repos/interviewSlot.repos.js';
import { Prisma } from '@prisma/client';
import { CreateUpdateTracker } from '../types/requests.types.js';
import { prisma } from '../utils/prisma.js';

class UpdateTrackerService {
    private repository: UpdateTrackerRepository;
    private interviewSlotRepository: InterviewSlotRepository;

    constructor() {
        this.repository = new UpdateTrackerRepository();
        this.interviewSlotRepository = new InterviewSlotRepository();
    }

    async createUpdateTracker(id: number, data: CreateUpdateTracker) {
        const updateTracker: Prisma.UpdateTrackerCreateInput = {
            JobDescription: {
                connect: {
                    JobDescriptionID: id
                }
            },
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
        return this.repository.createUpdateTracker(updateTracker);
    }

    async updateUpdateTracker(jobDescriptionId: number, employeeId: number, data: any) {
        const updateTrackerData: Prisma.UpdateTrackerUpdateInput = {
            ExpectedTimeline: data.ExpectedTimeline ? data.ExpectedTimeline : undefined,
            Level1PanelInterviewSlots: data.Level1PanelInterviewSlots ? data.Level1PanelInterviewSlots : undefined,
            Level2PanelInterviewSlots: data.Level2PanelInterviewSlots ? data.Level2PanelInterviewSlots : undefined,
            Status: data.Status ? data.Status : undefined,
            Comments: data.Comments ? data.Comments : undefined,
            Priority: data.Priority ? {
                connect: {
                    PriorityID: parseInt(data.Priority)
                }
            } : undefined,
            BudgetRanges: data.Budget ? {
                connect: {
                    BudgetID: parseInt(data.Budget)
                }
            } : undefined,
            Employee_UpdateTracker_Level1PanelIDToEmployee: data.Level1PanelInterview
                ? {
                    connect: {
                        EmployeeID: parseInt(data.Level1PanelInterview)
                    }
                }
                : undefined,
            Employee_UpdateTracker_Level2PanelIDToEmployee: data.Level2PanelInterview
                ? {
                    connect: {
                        EmployeeID: parseInt(data.Level2PanelInterview)
                    }
                }
                : undefined
        }
        console.log(updateTrackerData);
        return prisma.updateTracker.upsert({
            where: { EmployeeID_JobDescriptionID: { JobDescriptionID: jobDescriptionId, EmployeeID: employeeId } },
            update: updateTrackerData,
            create: {
                JobDescription: {
                    connect: {
                        JobDescriptionID: jobDescriptionId
                    }
                },
                Employee_UpdateTracker_EmployeeIDToEmployee: {
                    connect: {
                        EmployeeID: employeeId
                    }
                },
                ExpectedTimeline: data.ExpectedTimeline,
                Employee_UpdateTracker_Level1PanelIDToEmployee: {
                        connect: {
                            EmployeeID: parseInt(data.Level1PanelInterview)
                        }
                    },
                Employee_UpdateTracker_Level2PanelIDToEmployee: {
                        connect: {
                            EmployeeID: parseInt(data.Level2PanelInterview)
                        }
                    },
                Level1PanelInterviewSlots: data.Level1PanelInterviewSlots,
                Level2PanelInterviewSlots: data.Level2PanelInterviewSlots,
                Status: data.Status,
                Comments: data.Comments,
                Priority: { connect: { PriorityID: parseInt(data.Priority) } },
                BudgetRanges: { connect: { BudgetID: parseInt(data.Budget) } },
            }
        });
    }

    async getUpdateTrackersByJobDescriptionId(jobDescriptionId: number) {
        const updateTrackers = await this.repository.getUpdateTrackerByJobDescriptionId(jobDescriptionId);

        for (const tracker of updateTrackers) {
            if (tracker.Level1PanelInterviewSlots) {
                const slotIds = tracker.Level1PanelInterviewSlots.split(',').map(Number).filter(id => !isNaN(id));
                console.log(slotIds);
                if (slotIds.length > 0) {
                    const slots = await this.interviewSlotRepository.getInterviewSlotNamesByIds(slotIds);
                    console.log(slots);
                    tracker.Level1PanelInterviewSlots = JSON.stringify(slotIds.map((id, index) => ({ id, name: slots[index].InterviewSlotName })));
                    console.log(tracker.Level1PanelInterviewSlots);
                } else {
                    tracker.Level1PanelInterviewSlots = JSON.stringify([]);
                }
            }
            if (tracker.Level2PanelInterviewSlots) {
                const slotIds = tracker.Level2PanelInterviewSlots.split(',').map(Number).filter(id => !isNaN(id));
                if (slotIds.length > 0) {
                    const slots = await this.interviewSlotRepository.getInterviewSlotNamesByIds(slotIds);
                    tracker.Level2PanelInterviewSlots = JSON.stringify(slotIds.map((id, index) => ({ id, name: slots[index].InterviewSlotName })));
                } else {
                    tracker.Level2PanelInterviewSlots = JSON.stringify([]);
                }
            }
        }

        return updateTrackers;
    }

    async getLatestEditsOfUpdateTracker(jobDescriptionId: number) {
        return this.repository.getLatestEditsOfUpdateTracker(jobDescriptionId);
    }
}

export default new UpdateTrackerService();