import { JobDescriptionRepository } from '../repos/jobDescription.repos.js';
import { Prisma } from '@prisma/client';
import { CreateJobDescription } from '../types/requests.types.js';

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
}

export default new JobDescriptionService();