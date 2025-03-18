import express, { Request, Response } from 'express';
import aiService from '../services/ai.services.js';
import { ApiErrorResponse } from '../types/employee.types.js';

const router = express.Router();

router.post('/subject', async (req: Request, res: Response) => {
    try {
        // console.log(req.body);
        const formData = req.body;
        if (formData && Object.keys(formData).length > 0) {
            const response = await aiService.getSubject(formData);
            // console.log(response);
            res.json(response);
        }
        else {
            res.json({ success: false, message: 'No data provided' });
        }
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch subject',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
})

router.get('/questions', async (req: Request, res: Response) => {
    try {
        const formData = req.body;
        const response = await aiService.getQuestions(formData);
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch questions',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
})

export default router;