import express, { Request, Response } from 'express';
import { employeeService } from '../services/employee.services.js';
import { ApiErrorResponse, EmployeeQueryParams } from '../types/employee.types.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const queryParams: EmployeeQueryParams = {
            page: req.query.page ? parseInt(req.query.page as string) : undefined,
            limit: req.query.limit ? parseInt(req.query.limit as string) : undefined,
            search: req.query.search as string,
            employeeIdSearch: req.query.employeeId as string,
            departmentId: req.query.departmentId ? parseInt(req.query.departmentId as string) : undefined,
            designation: req.query.designation as string,
            sortBy: req.query.sortBy as keyof EmployeeQueryParams['sortBy'],
            sortOrder: req.query.sortOrder as 'asc' | 'desc',
            searchBy: req.query.searchBy as string
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

router.get('/:id', authenticateToken, async (req, res) => {
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

router.get('/profile/:id', authenticateToken, async (req, res) => {
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
        const response = await employeeService.getEmployeeProfileByID(employeeId);

        if (!response) {
            return res.status(404).json(response);
        }
        res.json(response);
    }
    catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch employee profile',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.post('/add-a-user', authorizeRoles('Recruiter', 'Admin'), authenticateToken, async (req, res) => {
    try {
        const response = await employeeService.addEmployee(req.body);
        const formattedResponse = {
            success: true,
            data: response,
            message: 'Employee added successfully'
        }
        res.status(201).json(formattedResponse);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to add employee',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.put('/profile/:id', authenticateToken, async (req, res) => {
    try {
        const employeeId = parseInt(req.params.id);
        const response = await employeeService.updateEmployeeProfile(employeeId, req.body);
        const formattedResponse = {
            success: true,
            data: response,
            message: 'Employee password updated successfully'
        }
        res.status(200).json(formattedResponse);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to update employee profile',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

export default router;
