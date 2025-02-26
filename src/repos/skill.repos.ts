import { PrismaClient } from '@prisma/client';
import { SkillQueryParams } from '../types/skill.types.js';

const prisma = new PrismaClient();

export const skillRepository = {
    async getAllSkills(params: SkillQueryParams) {
        const {
            page = 1,
            limit = 10,
            search,
            sortBy = 'SkillName',
            sortOrder = 'asc'
        } = params;

        const skip = (page - 1) * limit;

        const where = {
            ...(search ? {
                SkillName: {
                    contains: search
                }
            } : {})
        };

        const skills = await prisma.skills.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder }
        });

        const total = await prisma.skills.count({ where });

        return { skills, total };
    },

    async getSkillById(id: number) {
        const skill = await prisma.skills.findUnique({
            where: {
                SkillID: id
            }
        });

        return skill;
    }
}; 