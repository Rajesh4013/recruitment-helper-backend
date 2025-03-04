import { JobDescriptionRepository } from '../repos/jobDescription.repos.js';
import { Prisma } from '@prisma/client';
import { CreateJobDescription } from '../types/requests.types.js';
import updateTrackerServices from './updateTracker.services.js';
import resourceRequestServices from './resourceRequest.services.js';

class JobDescriptionService {
    private repository: JobDescriptionRepository;

    constructor() {
        this.repository = new JobDescriptionRepository();
    }

    async createJobDescription(data: CreateJobDescription) {
        const jd: Prisma.JobDescriptionCreateInput = {
            ModeOfWork: {
                connect: {
                    ModeOfWorkID: data.modeOfWorkID
                }
            },
            Education: {
                connect: {
                    EducationID: data.educationID
                }
            },
            Experience: data.experience,
            RequiredTechnicalSkills: data.requiredTechnicalSkills,
            PreferredTechnicalSkills: data.preferredTechnicalSkills,
            Responsibility: data.responsibilities,
            Certifications: data.certifications,
            AdditionalReasons: data.additionalReasons,
            Role: data.role,
            JobType: {
                connect: {
                    JobTypeID: data.jobTypeID
                }
            },
            Location: data.location,
            NoticePeriod: {
                connect: {
                    NoticePeriodID: data.noticePeriodID
                }
            },
            OpenPositions: data.openPositions
        }
        return this.repository.createJobDescription(jd);
    }

    async getJobDescriptionDetails(jobDescriptionId: number) {
        const jobDescription = await this.repository.getJobDescriptionById(jobDescriptionId);
        if (jobDescription) {
            const resourceRequests = await resourceRequestServices.getResourceRequestsByJobDescriptionId(jobDescriptionId);
            const updateTrackers = await updateTrackerServices.getUpdateTrackersByJobDescriptionId(jobDescriptionId);

            const employees = new Map();
            resourceRequests.forEach(request => {
                employees.set(request.Employee.EmployeeID, request.Employee);
            });
            updateTrackers.forEach(tracker => {
                if (tracker.Employee_UpdateTracker_EmployeeIDToEmployee) {
                    employees.set(tracker.Employee_UpdateTracker_EmployeeIDToEmployee.EmployeeID, tracker.Employee_UpdateTracker_EmployeeIDToEmployee);
                }
                if (tracker.Employee_UpdateTracker_Level1PanelIDToEmployee) {
                    employees.set(tracker.Employee_UpdateTracker_Level1PanelIDToEmployee.EmployeeID, tracker.Employee_UpdateTracker_Level1PanelIDToEmployee);
                }
                if (tracker.Employee_UpdateTracker_Level2PanelIDToEmployee) {
                    employees.set(tracker.Employee_UpdateTracker_Level2PanelIDToEmployee.EmployeeID, tracker.Employee_UpdateTracker_Level2PanelIDToEmployee);
                }
            });

            const response = {
                jobDescription: {
                    ...jobDescription,
                    ModeOfWork: jobDescription.ModeOfWork.ModeOfWorkName,
                    Education: jobDescription.Education.EducationName,
                    JobType: jobDescription.JobType.JobTypeName,
                    NoticePeriod: jobDescription.NoticePeriod.NoticePeriodName,
                },
                resourceRequests: resourceRequests.map(request => ({
                    ...request,
                    Employee: request.Employee.EmployeeID
                })),
                updateTrackers: updateTrackers.map(tracker => ({
                    ...tracker,
                    Employee_UpdateTracker_EmployeeIDToEmployee: tracker.Employee_UpdateTracker_EmployeeIDToEmployee?.EmployeeID,
                    Employee_UpdateTracker_Level1PanelIDToEmployee: tracker.Employee_UpdateTracker_Level1PanelIDToEmployee?.EmployeeID,
                    Employee_UpdateTracker_Level2PanelIDToEmployee: tracker.Employee_UpdateTracker_Level2PanelIDToEmployee?.EmployeeID,
                    BudgetRanges: tracker.BudgetRanges.BudgetName,
                    Priority: tracker.Priority?.PriorityName || 'Unknown'
                })),
                employees: Array.from(employees.values())
            };

            return response;
        }
        return jobDescription;
    }
}

export default new JobDescriptionService();