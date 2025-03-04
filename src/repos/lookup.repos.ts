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
    async addEducation(data: any) {
        return prisma.education.create({ data });
    },
    async updateEducation(id: number, data: any) {
        return prisma.education.update({
            where: { EducationID: id },
            data
        });
    },
    async deleteEducation(id: number) {
        return prisma.education.delete({
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
    async addInterviewSlot(data: any) {
        return prisma.interviewSlots.create({ data });
    },
    async updateInterviewSlot(id: number, data: any) {
        return prisma.interviewSlots.update({
            where: { InterviewSlotID: id },
            data
        });
    },
    async deleteInterviewSlot(id: number) {
        return prisma.interviewSlots.delete({
            where: { InterviewSlotID: id }
        });
    },


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
    async addJobType(data: any) {
        return prisma.jobType.create({ data });
    },
    async updateJobType(id: number, data: any) {
        return prisma.jobType.update({
            where: { JobTypeID: id },
            data
        });
    },
    async deleteJobType(id: number) {
        return prisma.jobType.delete({
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
    async addModeOfWork(data: any) {
        return prisma.modeOfWork.create({ data });
    },
    async updateModeOfWork(id: number, data: any) {
        return prisma.modeOfWork.update({
            where: { ModeOfWorkID: id },
            data
        });
    },
    async deleteModeOfWork(id: number) {
        return prisma.modeOfWork.delete({
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
    async addNoticePeriod(data: any) {
        return prisma.noticePeriod.create({ data });
    },
    async updateNoticePeriod(id: number, data: any) {
        return prisma.noticePeriod.update({
            where: { NoticePeriodID: id },
            data
        });
    },
    async deleteNoticePeriod(id: number) {
        return prisma.noticePeriod.delete({
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
    async addPriority(data: any) {
        return prisma.priority.create({ data });
    },
    async updatePriority(id: number, data: any) {
        return prisma.priority.update({
            where: { PriorityID: id },
            data
        });
    },
    async deletePriority(id: number) {
        return prisma.priority.delete({
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
    },
    async addBudgetRange(data: any) {
        return prisma.budgetRanges.create({ data });
    },
    async updateBudgetRange(id: number, data: any) {
        return prisma.budgetRanges.update({
            where: { BudgetID: id },
            data
        });
    },
    async deleteBudgetRange(id: number) {
        return prisma.budgetRanges.delete({
            where: { BudgetID: id }
        });
    }
};