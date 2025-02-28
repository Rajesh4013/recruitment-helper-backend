import { prisma } from '../utils/prisma.js';

export const lookupRepository = {
    // Education
    async getAllEducation() {
        return await prisma.education.findMany({
            orderBy: { EducationName: 'asc' }
        });
    },
    async getEducationById(id: number) {
        return await prisma.education.findUnique({
            where: { EducationID: id }
        });
    },

    // Interview Slots
    async getAllInterviewSlots() {
        return await prisma.interviewSlots.findMany({
            orderBy: { InterviewSlotName: 'asc' }
        });
    },
    async getInterviewSlotById(id: number) {
        return await prisma.interviewSlots.findUnique({
            where: { InterviewSlotID: id }
        });
    },

    // Job Type
    async getAllJobTypes() {
        return await prisma.jobType.findMany({
            orderBy: { JobTypeName: 'asc' }
        });
    },
    async getJobTypeById(id: number) {
        return await prisma.jobType.findUnique({
            where: { JobTypeID: id }
        });
    },

    // Mode of Work
    async getAllModesOfWork() {
        return await prisma.modeOfWork.findMany({
            orderBy: { ModeOfWorkName: 'asc' }
        });
    },
    async getModeOfWorkById(id: number) {
        return await prisma.modeOfWork.findUnique({
            where: { ModeOfWorkID: id }
        });
    },

    // Notice Period
    async getAllNoticePeriods() {
        return await prisma.noticePeriod.findMany({
            orderBy: { NoticePeriodName: 'asc' }
        });
    },
    async getNoticePeriodById(id: number) {
        return await prisma.noticePeriod.findUnique({
            where: { NoticePeriodID: id }
        });
    },

    // Priority
    async getAllPriorities() {
        return await prisma.priority.findMany({
            orderBy: { PriorityName: 'asc' }
        });
    },
    async getPriorityById(id: number) {
        return await prisma.priority.findUnique({
            where: { PriorityID: id }
        });
    },

    // Budget Ranges
    async getAllBudgetRanges() {
        return await prisma.budgetRanges.findMany({
            orderBy: { BudgetName: 'asc' }
        });
    },
    
    async getBudgetRangeById(id: number) {
        return await prisma.budgetRanges.findUnique({
            where: { BudgetID: id }
        });
    }
}; 