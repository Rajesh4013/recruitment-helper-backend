import express, { Request, Response } from 'express';
import { lookupService } from '../services/lookup.services.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { ApiErrorResponse } from '../types/employee.types.js';

const router = express.Router();

// Education Routes
router.get('/education', authenticateToken, async (_req: Request, res: Response) => {
    try {
        const response = await lookupService.getAllEducation();
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch education list',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.get('/education/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const response = await lookupService.getEducationById(id);
        if (!response.success) {
            return res.status(404).json(response);
        }
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch education',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

// Interview Slots Routes
router.get('/interview-slots', authenticateToken, async (_req: Request, res: Response) => {
    try {
        const response = await lookupService.getAllInterviewSlots();
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch interview slots',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.get('/interview-slots/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const response = await lookupService.getInterviewSlotById(id);
        if (!response.success) {
            return res.status(404).json(response);
        }
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch interview slot',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

// Job Type Routes
router.get('/job-types', authenticateToken, async (_req: Request, res: Response) => {
    try {
        const response = await lookupService.getAllJobTypes();
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch job types',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.get('/job-types/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const response = await lookupService.getJobTypeById(id);
        if (!response.success) {
            return res.status(404).json(response);
        }
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch job type',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

// Mode of Work Routes
router.get('/modes-of-work', authenticateToken, async (_req: Request, res: Response) => {
    try {
        const response = await lookupService.getAllModesOfWork();
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch modes of work',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.get('/modes-of-work/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const response = await lookupService.getModeOfWorkById(id);
        if (!response.success) {
            return res.status(404).json(response);
        }
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch mode of work',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

// Notice Period Routes
router.get('/notice-periods', authenticateToken, async (_req: Request, res: Response) => {
    try {
        const response = await lookupService.getAllNoticePeriods();
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch notice periods',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.get('/notice-periods/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const response = await lookupService.getNoticePeriodById(id);
        if (!response.success) {
            return res.status(404).json(response);
        }
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch notice period',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

// Priority Routes
router.get('/priorities', authenticateToken, async (_req: Request, res: Response) => {
    try {
        const response = await lookupService.getAllPriorities();
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch priorities',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.get('/priorities/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const response = await lookupService.getPriorityById(id);
        if (!response.success) {
            return res.status(404).json(response);
        }
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch priority',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

// Budget Ranges Routes
router.get('/budget-ranges', authenticateToken, async (_req: Request, res: Response) => {
    try {
        const response = await lookupService.getAllBudgetRanges();
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch budget ranges',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

router.get('/budget-ranges/:id', authenticateToken, async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid ID format'
            });
        }

        const response = await lookupService.getBudgetRangeById(id);
        if (!response.success) {
            return res.status(404).json(response);
        }
        res.json(response);
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Failed to fetch budget range',
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        };
        res.status(500).json(errorResponse);
    }
});

export default router; 