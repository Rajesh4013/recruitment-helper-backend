import express, { Request, Response } from 'express';
import { authService } from '../services/auth.services.js';
import { LoginCredentials } from '../types/auth.types.js';
import { ApiErrorResponse } from '../types/employee.types.js';

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

export default router; 