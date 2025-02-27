import { skillRepository } from '../repos/skill.repos.js';
import { GetSkillsResponse, GetSkillResponse, SkillQueryParams, CreateSkillRequest, UpdateSkillRequest, CreateUpdateSkillResponse, DeleteSkillResponse } from '../types/skill.types.js';

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
    },

    async createSkill(data: CreateSkillRequest): Promise<CreateUpdateSkillResponse> {
        try {
            const skill = await skillRepository.createSkill(data.skillName);
            
            return {
                success: true,
                data: skill,
                message: 'Skill created successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async updateSkill(id: number, data: UpdateSkillRequest): Promise<CreateUpdateSkillResponse> {
        try {
            const existingSkill = await skillRepository.getSkillById(id);
            
            if (!existingSkill) {
                return {
                    success: false,
                    data: null,
                    message: 'Skill not found'
                };
            }

            const skill = await skillRepository.updateSkill(id, data.skillName);
            
            return {
                success: true,
                data: skill,
                message: 'Skill updated successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async deleteSkill(id: number): Promise<DeleteSkillResponse> {
        try {
            const existingSkill = await skillRepository.getSkillById(id);
            
            if (!existingSkill) {
                return {
                    success: false,
                    message: 'Skill not found'
                };
            }

            await skillRepository.deleteSkill(id);
            
            return {
                success: true,
                message: 'Skill deleted successfully'
            };
        } catch (error) {
            throw error;
        }
    }
}; 