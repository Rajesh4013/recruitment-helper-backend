import { skillRepository } from '../repos/skill.repos.js';
import { GetSkillsResponse, GetSkillResponse, SkillQueryParams } from '../types/skill.types.js';

export const skillService = {
    async getAllSkills(params: SkillQueryParams): Promise<GetSkillsResponse> {
        try {
            const { skills, total } = await skillRepository.getAllSkills(params);
            
            return {
                success: true,
                data: skills,
                message: 'Skills retrieved successfully',
                pagination: {
                    total,
                    page: params.page || 1,
                    limit: params.limit || 10
                }
            };
        } catch (error) {
            throw error;
        }
    },

    async getSkillById(id: number): Promise<GetSkillResponse> {
        try {
            const skill = await skillRepository.getSkillById(id);
            
            if (!skill) {
                return {
                    success: false,
                    data: null,
                    message: 'Skill not found'
                };
            }

            return {
                success: true,
                data: skill,
                message: 'Skill retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    }
}; 