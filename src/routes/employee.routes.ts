import express, { Request, Response } from 'express';
import { employeeService } from '../services/employee.services.js';
import { ApiErrorResponse, EmployeeQueryParams } from '../types/employee.types.js';
import { authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authorizeRoles('Recruiter', 'Manager'), async (req: Request, res: Response) => {
    try {
        const queryParams: EmployeeQueryParams = {
            page: req.query.page ? parseInt(req.query.page as string) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
            search: req.query.search as string,
            departmentId: req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined,
            designation: req.query.designation as string,
            sortBy: req.query.sortBy as keyof EmployeeQueryParams['sortBy'],
            sortOrder: req.query.sortOrder as 'asc' | 'desc'
        };

        const response = await employeeService.getAllEmployees(queryParams);
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch employees',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const employeeId = parseInt(req.params.id);
        
        if (isNaN(employeeId)) {
            const errorResponse: ApiErrorResponse = {
                success: false,
                message: 'Invalid employee ID',
                error: 'ID must be a number'
            };
            return res.status(400).json(errorResponse);
        }

        const response = await employeeService.getEmployeeById(employeeId);
        
        if (!response.success) {
            return res.status(404).json(response);
        }

        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch employee',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

export default router;
