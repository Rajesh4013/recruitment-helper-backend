import express, { Request, Response } from 'express';
import { skillService } from '../services/skill.services.js';
import { ApiErrorResponse } from '../types/employee.types.js';
import { SkillQueryParams } from '../types/skill.types.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all skills with search and pagination
router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const queryParams: SkillQueryParams = {
            page: req.query.page ? parseInt(req.query.page as string) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
            search: req.query.search as string,
            sortBy: req.query.sortBy as keyof SkillQueryParams['sortBy'],
            sortOrder: req.query.sortOrder as 'asc' | 'desc'
        };

        const response = await skillService.getAllSkills(queryParams);
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch skills',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

// Get skill by ID
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const skillId = parseInt(req.params.id);
        
        if (isNaN(skillId)) {
            const errorResponse: ApiErrorResponse = {
                success: false,
                message: 'Invalid skill ID',
                error: 'ID must be a number'
            };
            return res.status(400).json(errorResponse);
        }

        const response = await skillService.getSkillById(skillId);
        
        if (!response.success) {
            return res.status(404).json(response);
        }

        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch skill',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

export default router; 