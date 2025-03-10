import express from 'express';
import jobDescriptionServices from '../services/jobDescription.services.js';
import updateTrackerServices from '../services/updateTracker.services.js';
import resourceRequestServices from '../services/resourceRequest.services.js';
import {employeeService} from '../services/employee.services.js';
import emailServices from '../services/email.services.js';
// import { formatEmailBody } from '../utils/emailFormatter.js';
import { Prisma } from '@prisma/client';
import { CreateJobDescription, CreateResourceRequest, CreateUpdateTracker } from '../types/requests.types.js';
import { AuthenticatedRequest } from '../types/auth.types.js';
import { sendJobRequestCreateEmail } from '../utils/email.Sender.js';

const router = express.Router();

router.post('/job-description', async (req, res) => {
    try {
        const jobDescriptionData = req.body;
        console.log(req.body);
        const updateTracker: CreateUpdateTracker = {
            employeeID: jobDescriptionData.requestedBy,
            budgetID: jobDescriptionData.budget,
            priorityID: jobDescriptionData.priority,
            expectedTimeline: jobDescriptionData.expectedTimeline,
            level1InterviewPanelID: jobDescriptionData.level1PanelInterview,
            level1PanelInterviewSlots: jobDescriptionData.level1PanelInterviewSlots,
            level2InterviewPanelID: jobDescriptionData.level2PanelInterview,
            level2PanelInterviewSlots: jobDescriptionData.level2PanelInterviewSlots,
        }

        const jobDescription: CreateJobDescription = {
            modeOfWorkID: jobDescriptionData.modeOfWork,
            educationID: jobDescriptionData.education,
            experience: jobDescriptionData.experience,
            requiredTechnicalSkills: jobDescriptionData.requiredSkills,
            preferredTechnicalSkills: jobDescriptionData.preferredSkills,
            responsibilities: jobDescriptionData.responsibilities,
            certifications: jobDescriptionData.certifications,
            additionalReasons: jobDescriptionData.additionalReasons,
            role: jobDescriptionData.role,
            jobTypeID: jobDescriptionData.jobType,
            location: jobDescriptionData.location,
            noticePeriodID: jobDescriptionData.noticePeriod,
            openPositions: jobDescriptionData.openPositions,
        }

        const resourceRequest: CreateResourceRequest = {
            requestedBy: jobDescriptionData.requestedBy,
            requestTitle: jobDescriptionData.requestTitle,
        }

        const jdcreationResponse = await jobDescriptionServices.createJobDescription(jobDescription);
        const resourceRequestResponse = await resourceRequestServices.createResourceRequest(jdcreationResponse.JobDescriptionID, resourceRequest);
        const updateTrackerResponse = await updateTrackerServices.createUpdateTracker(jdcreationResponse.JobDescriptionID, updateTracker);

        const employeeId = (req as AuthenticatedRequest).user?.employeeId;
        if (employeeId !== undefined) {
            sendJobRequestCreateEmail(employeeId, resourceRequestResponse.ResourceRequestID);
        } else {
            console.error('Error: employeeId is undefined');
        }

        res.status(201).json({
            success: true,
            message: 'Job description created successfully',
            data: {
                resourceRequest: resourceRequestResponse,
                jobDescription: jdcreationResponse,
                updateTracker: updateTrackerResponse,
            },
        });
    } catch (error) {
        console.error('Error creating job description:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create job description',
        });
    }
});

export default router;
