import express, { Request, Response } from 'express';
import { authService } from '../services/auth.services.js';
import { LoginCredentials, SignupRequest } from '../types/auth.types.js';
import { ApiErrorResponse } from '../types/employee.types.js';
import { authenticateToken, authorizeRoles } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const credentials: LoginCredentials = {
            email: req.body.email,
            password: req.body.password
        };

        const response = await authService.login(credentials);
        
        if (!response.success) {
            return res.status(401).json(response);
        }

        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Login failed',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.post('/signup', authenticateToken, authorizeRoles('Recruiter'), async (req: Request, res: Response) => {
    try {
        const signupData: SignupRequest = {
            employeeId: parseInt(req.body.employeeId),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            designation: req.body.designation,
            departmentId: req.body.departmentId ? parseInt(req.body.departmentId) : undefined,
            role: req.body.role
        };

        if (isNaN(signupData.employeeId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid employee ID format'
            });
        }

        const response = await authService.signup(signupData);
        
        if (!response.success) {
            return res.status(400).json(response);
        }

        res.status(201).json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Registration failed',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

export default router; 