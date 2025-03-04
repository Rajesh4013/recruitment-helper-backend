import { lookupRepository } from '../repos/lookup.repos.js';
import { GetAllResponse, GetByIdResponse, Education, InterviewSlot, JobType, ModeOfWork, NoticePeriod, Priority, BudgetRange } from '../types/lookup.types.js';

export const lookupService = {
    // Education
    async getAllEducation(): Promise<GetAllResponse<Education>> {
        try {
            const data = await lookupRepository.getAllEducation();
            return {
                success: true,
                data,
                message: 'Education list retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async getEducationById(id: number): Promise<GetByIdResponse<Education>> {
        try {
            const data = await lookupRepository.getEducationById(id);
            return {
                success: !!data,
                data,
                message: data ? 'Education retrieved successfully' : 'Education not found'
            };
        } catch (error) {
            throw error;
        }
    },

    // Similar methods for other entities...
    // InterviewSlots
    async getAllInterviewSlots(): Promise<GetAllResponse<InterviewSlot>> {
        try {
            const data = await lookupRepository.getAllInterviewSlots();
            return {
                success: true,
                data,
                message: 'Interview slots retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async getInterviewSlotById(id: number): Promise<GetByIdResponse<InterviewSlot>> {
        try {
            const data = await lookupRepository.getInterviewSlotById(id);
            return {
                success: !!data,
                data,
                message: data ? 'Interview slot retrieved successfully' : 'Interview slot not found'
            };
        } catch (error) {
            throw error;
        }
    },

    // Job Types
    async getAllJobTypes(): Promise<GetAllResponse<JobType>> {
        try {
            const data = await lookupRepository.getAllJobTypes();
            return {
                success: true,
                data,
                message: 'Job types retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async getJobTypeById(id: number): Promise<GetByIdResponse<JobType>> {
        try {
            const data = await lookupRepository.getJobTypeById(id);
            return {
                success: !!data,
                data,
                message: data ? 'Job type retrieved successfully' : 'Job type not found'
            };
        } catch (error) {
            throw error;
        }
    },

    // Mode of Work
    async getAllModesOfWork(): Promise<GetAllResponse<ModeOfWork>> {
        try {
            const data = await lookupRepository.getAllModesOfWork();
            return {
                success: true,
                data,
                message: 'Modes of work retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async getModeOfWorkById(id: number): Promise<GetByIdResponse<ModeOfWork>> {
        try {
            const data = await lookupRepository.getModeOfWorkById(id);
            return {
                success: !!data,
                data,
                message: data ? 'Mode of work retrieved successfully' : 'Mode of work not found'
            };
        } catch (error) {
            throw error;
        }
    },

    // Notice Period
    async getAllNoticePeriods(): Promise<GetAllResponse<NoticePeriod>> {
        try {
            const data = await lookupRepository.getAllNoticePeriods();
            return {
                success: true,
                data,
                message: 'Notice periods retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async getNoticePeriodById(id: number): Promise<GetByIdResponse<NoticePeriod>> {
        try {
            const data = await lookupRepository.getNoticePeriodById(id);
            return {
                success: !!data,
                data,
                message: data ? 'Notice period retrieved successfully' : 'Notice period not found'
            };
        } catch (error) {
            throw error;
        }
    },

    // Priority
    async getAllPriorities(): Promise<GetAllResponse<Priority>> {
        try {
            const data = await lookupRepository.getAllPriorities();
            return {
                success: true,
                data,
                message: 'Priorities retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async getPriorityById(id: number): Promise<GetByIdResponse<Priority>> {
        try {
            const data = await lookupRepository.getPriorityById(id);
            return {
                success: !!data,
                data,
                message: data ? 'Priority retrieved successfully' : 'Priority not found'
            };
        } catch (error) {
            throw error;
        }
    },

    // Budget Ranges
    async getAllBudgetRanges(): Promise<GetAllResponse<BudgetRange>> {
        try {
            const data = await lookupRepository.getAllBudgetRanges();
            return {
                success: true,
                data,
                message: 'Budget ranges retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async getBudgetRangeById(id: number): Promise<GetByIdResponse<BudgetRange>> {
        try {
            const data = await lookupRepository.getBudgetRangeById(id);
            return {
                success: !!data,
                data,
                message: data ? 'Budget range retrieved successfully' : 'Budget range not found'
            };
        } catch (error) {
            throw error;
        }
    },

    async addLookup(type: string, data: any) {
        switch (type) {
            case 'education':
                return lookupRepository.addEducation(data);
            case 'interview-slot':
                return lookupRepository.addInterviewSlot(data);
            case 'job-type':
                return lookupRepository.addJobType(data);
            case 'modes-of-work':
                return lookupRepository.addModeOfWork(data);
            case 'notice-period':
                return lookupRepository.addNoticePeriod(data);
            case 'priority':
                return lookupRepository.addPriority(data);
            case 'budget-range':
                return lookupRepository.addBudgetRange(data);
            default:
                throw new Error('Invalid lookup type');
        }
    },

    async updateLookup(type: string, id: number, data: any) {
        switch (type) {
            case 'education':
                return lookupRepository.updateEducation(id, data);
            case 'interview-slot':
                return lookupRepository.updateInterviewSlot(id, data);
            case 'job-type':
                return lookupRepository.updateJobType(id, data);
            case 'modes-of-work':
                return lookupRepository.updateModeOfWork(id, data);
            case 'notice-period':
                return lookupRepository.updateNoticePeriod(id, data);
            case 'priority':
                return lookupRepository.updatePriority(id, data);
            case 'budget-range':
                return lookupRepository.updateBudgetRange(id, data);
            default:
                throw new Error('Invalid lookup type');
        }
    },

    async deleteLookup(type: string, id: number) {
        switch (type) {
            case 'education':
                return lookupRepository.deleteEducation(id);
            case 'interview-slot':
                return lookupRepository.deleteInterviewSlot(id);
            case 'job-type':
                return lookupRepository.deleteJobType(id);
            case 'modes-of-work':
                return lookupRepository.deleteModeOfWork(id);
            case 'notice-period':
                return lookupRepository.deleteNoticePeriod(id);
            case 'priority':
                return lookupRepository.deletePriority(id);
            case 'budget-range':
                return lookupRepository.deleteBudgetRange(id);
            default:
                throw new Error('Invalid lookup type');
        }
    }
};