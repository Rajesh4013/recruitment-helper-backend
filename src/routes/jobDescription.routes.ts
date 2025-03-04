import express from 'express';
import jobDescriptionServices from '../services/jobDescription.services.js';
import updateTrackerServices from '../services/updateTracker.services.js';
import resourceRequestServices from '../services/resourceRequest.services.js';
import { Prisma } from '@prisma/client';
import { CreateJobDescription, CreateResourceRequest, CreateUpdateTracker } from '../types/requests.types.js';

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


        res.status(201).json({
            success: true,
            message: 'Job description created successfully',
            data: {
                resourceRequestId: resourceRequestResponse,
                jobDescriptionId: jdcreationResponse,
                updateTrackerId: updateTrackerResponse,
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

// router.get('/resource-request/:resourceRequestId', async (req, res) => {
//     try {
//         const resourceRequestId = parseInt(req.params.resourceRequestId);
//         const ids = await resourceRequestServices.getIdsByResourceRequestId(resourceRequestId);
//         const jobDescriptionDetails = await jobDescriptionServices.getJobDescriptionDetails(ids.jobDescriptionID ?? 0);
//         res.status(200).json({
//             success: true,
//             data: jobDescriptionDetails,
//         });
//     } catch (error) {
//         console.error('Error fetching job description details:', error);
//         res.status(500).json({
//             success: false,
//             message: 'Failed to fetch job description details',
//         });
//     }
// });

export default router;
