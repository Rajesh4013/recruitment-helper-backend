import { ResourceRequestRepository } from '../repos/resourceRequest.repos.js';
import { JobDescriptionRepository } from '../repos/jobDescription.repos.js';
import { UpdateTrackerRepository } from '../repos/updateTracker.repos.js';
import { Prisma } from '@prisma/client';
import { CreateResourceRequest } from '../types/requests.types.js';
import updateTrackerServices from './updateTracker.services.js';

class ResourceRequestService {
    private repository: ResourceRequestRepository;
    private jobDescriptionRepository: JobDescriptionRepository;
    private updateTrackerRepository: UpdateTrackerRepository;

    constructor() {
        this.repository = new ResourceRequestRepository();
        this.jobDescriptionRepository = new JobDescriptionRepository();
        this.updateTrackerRepository = new UpdateTrackerRepository();
    }

    async createResourceRequest(id: number, data: CreateResourceRequest) {
        const resourceRequest: Prisma.ResourceRequestsCreateInput = {
            JobDescription: {
                connect: {
                    JobDescriptionID: id
                }
            },
            Employee: {
                connect: {
                    EmployeeID: parseInt(data.requestedBy)
                }
            },
            RequestTitle: data.requestTitle
        }
        return this.repository.createResourceRequest(resourceRequest);
    }

    async getIdsByResourceRequestId(requestId: number) {
        const jobDescription = await this.repository.getJobDescriptionIdByResourceRequestId(requestId);
        const jobDescriptionID = jobDescription?.JobDescriptionID;
        const updateTrackerID = jobDescriptionID !== null && jobDescriptionID !== undefined
            ? await this.updateTrackerRepository.getUpdateTrackerIdByJobDescriptionId(jobDescriptionID)
            : null;
        return { jobDescriptionID, updateTrackerID: updateTrackerID?.UpdateTrackerID };
    }

    async getResourceRequestsByEmployeeId(employeeId: number) {
        const employee = await this.repository.getEmployeeRole(employeeId);
        const role = employee?.Login?.Role ?? '';
        const departmentId = employee?.DepartmentID ?? 0;
        return this.repository.getResourceRequestsByEmployeeId(employeeId, role, departmentId);
    }

    async getResourceRequestById(requestId: number) {
        const resourceRequest = await this.repository.getResourceRequestById(requestId);
        if (resourceRequest) {
            const updateTracker = await updateTrackerServices.getUpdateTrackersByJobDescriptionId(resourceRequest.JobDescriptionID);
            return { ...resourceRequest, updateTracker };
        }
        return resourceRequest;
    }

    async getResourceRequestsByJobDescriptionId(jobDescriptionId: number) {
        return this.repository.getResourceRequestsByJobDescriptionId(jobDescriptionId);
    }

    async updateResourceRequestById(requestId: number, data: Prisma.ResourceRequestsUpdateInput) {
        return this.repository.updateResourceRequest(requestId, data);
    }

    async updateResourceRequest(requestId: number, employeeId: number, data: any) {
        // console.log(data);
        const ids = await this.getIdsByResourceRequestId(requestId);

        const resourceRequest: Prisma.ResourceRequestsUpdateInput = {
            RequestTitle: data.requestTitle
        }

        const jobDescription: Prisma.JobDescriptionUpdateInput = {
            Role: data.role,
            OpenPositions: data.openPositions,
            Location: data.location,
            NoticePeriod: data.noticePeriod ? {
                connect: {
                    NoticePeriodID: parseInt(data.noticePeriod)
                }
            } : undefined,
            JobType: data.jobType ? {
                connect: {
                    JobTypeID: parseInt(data.jobType)
                }
            } : undefined,
            Education: data.education ? {
                connect: {
                    EducationID: parseInt(data.education)
                }
            } : undefined,
            ModeOfWork: data.modeOfWork ? {
                connect: {
                    ModeOfWorkID: parseInt(data.modeOfWork)
                }
            } : undefined,
            Experience: data.experience,
            RequiredTechnicalSkills: data.requiredSkills,
            PreferredTechnicalSkills: data.preferredSkills,
            Responsibility: data.responsibilities,
            Certifications: data.certifications,
            AdditionalReasons: data.additionalReasons
        }

        const updateTracker: Prisma.UpdateTrackerUpdateInput = {
            ExpectedTimeline: data.expectedTimeline,
            Employee_UpdateTracker_Level1PanelIDToEmployee: data.level1PanelInterview ? {
                connect: {
                    EmployeeID: parseInt(data.level1PanelInterview)
                }
            } : undefined,
            Employee_UpdateTracker_Level2PanelIDToEmployee: data.level2PanelInterview ? {
                connect: {
                    EmployeeID: parseInt(data.level2PanelInterview)
                }
            } : undefined,
            Level1PanelInterviewSlots: data.level1PanelInterviewSlots ? data.level1PanelInterviewSlots : undefined,
            Level2PanelInterviewSlots: data.level2PanelInterviewSlots ? data.level2PanelInterviewSlots : undefined,
            BudgetRanges: data.budget ? {
                connect: {
                    BudgetID: parseInt(data.budget)
                }
            } : undefined,
            Priority: data.priority ? {
                connect: {
                    PriorityID: parseInt(data.priority)
                }
            } : undefined
        }

        // console.log("---------------------\n", jobDescription, updateTracker, resourceRequest, "\n---------------------------");

        if (jobDescription) {
            if (ids.jobDescriptionID !== undefined) {
                await this.jobDescriptionRepository.updateJobDescription(ids.jobDescriptionID, jobDescription);
                await this.updateTrackerRepository.updateUpdateTracker(ids.jobDescriptionID, employeeId, updateTracker);
            }
        }

        const updatedResourceRequest = await this.repository.updateResourceRequest(requestId, resourceRequest);
        // sendJobRequestUpdateEmail(employeeId, );
        return updatedResourceRequest;
    }

    async deleteResourceRequest(requestId: number) {
        return this.repository.deleteResourceRequest(requestId);
    }
}

export default new ResourceRequestService();
