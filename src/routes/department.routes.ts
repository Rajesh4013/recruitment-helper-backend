import express, { Request, Response } from 'express';
import { departmentService } from '../services/department.services.js';
import { ApiErrorResponse } from '../types/employee.types.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all departments
router.get('/', authenticateToken, async (_req: Request, res: Response) => {
    try {
        const response = await departmentService.getAllDepartments();
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch departments',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

// Get department by ID
router.get('/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const departmentId = parseInt(req.params.id);
        
        if (isNaN(departmentId)) {
            const errorResponse: ApiErrorResponse = {
                success: false,
                message: 'Invalid department ID',
                error: 'ID must be a number'
            };
            return res.status(400).json(errorResponse);
        }

        const response = await departmentService.getDepartmentById(departmentId);
        
        if (!response.success) {
            return res.status(404).json(response);
        }

        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch department',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

export default router; 