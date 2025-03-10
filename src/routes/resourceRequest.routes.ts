import express from 'express';
import resourceRequestServices from '../services/resourceRequest.services.js';
import { AuthenticatedRequest } from '../types/auth.types.js';
import { sendJobRequestUpdateEmail, sendJobRequestUpdateEmailByHR } from '../utils/email.Sender.js';
import { request } from 'http';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/resource-requests/:employeeId', async (req, res) => {
    try {
        const employeeId = parseInt(req.params.employeeId);
        const resourceRequests = await resourceRequestServices.getResourceRequestsByEmployeeId(employeeId);
        res.status(200).json({
            success: true,
            data: resourceRequests,
        });
    } catch (error) {
        console.error('Error fetching resource requests:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resource requests',
        });
    }
});

router.get('/resource-request/:requestId', async (req, res) => {
    try {
        const requestId = parseInt(req.params.requestId);
        const resourceRequest = await resourceRequestServices.getResourceRequestById(requestId);
        res.status(200).json({
            success: true,
            data: resourceRequest,
        });
    } catch (error) {
        console.error('Error fetching resource request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch resource request',
        });
    }
});

router.put('/resource-request/:requestId', async (req, res) => {
    try {
        console.log(req);
        const requestId = parseInt(req.params.requestId);
        const employeeId = (req as AuthenticatedRequest).user?.employeeId ?? 0;
        // console.log(employeeId);
        const data = req.body;
        const updatedResourceRequest = await resourceRequestServices.updateResourceRequest(requestId, employeeId, data);
        if (updatedResourceRequest) {
            sendJobRequestUpdateEmail(requestId, employeeId);
        }
        res.status(200).json({
            success: true,
            data: updatedResourceRequest,
        });
    } catch (error) {
        console.error('Error updating resource request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update resource request',
        });
    }
});

router.put('/resource-requests/:requestId', async (req, res) => {
    try {
        console.log(req);
        const requestId = parseInt(req.params.requestId);
        // const employeeId = (req as AuthenticatedRequest).user?.employeeId ?? 0;
        const data = req.body;
        const updatedResourceRequest = await resourceRequestServices.updateResourceRequestById(requestId, data);
        if (updatedResourceRequest) {
            sendJobRequestUpdateEmailByHR(requestId);
        }
        res.status(200).json({
            success: true,
            data: updatedResourceRequest,
        });
    } catch (error) {
        console.error('Error updating resource request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update resource request',
        });
    }
});

router.delete('/resource-request/:requestId', async (req, res) => {
    try {
        const requestId = parseInt(req.params.requestId);
        await resourceRequestServices.deleteResourceRequest(requestId);
        res.status(200).json({
            success: true,
            message: 'Resource request deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting resource request:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete resource request',
        });
    }
});

export default router;
