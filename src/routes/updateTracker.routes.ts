import express from 'express';
import updateTrackerServices from '../services/updateTracker.services.js';
import { AuthenticatedRequest } from '../types/auth.types.js';

const router = express.Router();

router.put('/update-tracker/:jobDescriptionId', async (req, res) => {
    try {
        const id = parseInt(req.params.jobDescriptionId);
        const employeeId = (req as AuthenticatedRequest).user?.employeeId ?? 0;
        const data = req.body;
        const updatedUpdateTracker = await updateTrackerServices.updateUpdateTracker(id, employeeId, data);
        res.status(200).json({
            success: true,
            data: updatedUpdateTracker,
        });
    } catch (error) {
        console.error('Error updating update tracker:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update update tracker',
        });
    }
});

export default router;
