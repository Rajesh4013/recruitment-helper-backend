import { CreateJobDescription, CreateResourceRequest, CreateUpdateTracker } from '../types/requests.types.js';
import resourceRequestServices from '../services/resourceRequest.services.js';

export function formatEmailBody(
    // requestId: number,
    jobDescription: CreateJobDescription,
    resourceRequest: CreateResourceRequest,
    updateTracker: CreateUpdateTracker,
    name: string
): string {
    // const requestResponse = await resourceRequestServices.getResourceRequestById(requestId);
    // console.log(requestResponse);
    return `
        A new job description has been created by ${name} with the following details:

        Job Description:
            We are looking for a dedicated ${jobDescription.role} to join our team in a ${jobDescription.modeOfWorkID} environment. The ideal candidate will hold a background in ${jobDescription.educationID} with ${jobDescription.experience} years of experience. This role requires strong proficiency in ${jobDescription.requiredTechnicalSkills}, and familiarity with ${jobDescription.preferredTechnicalSkills} is highly advantageous. The successful applicant will be responsible for ${jobDescription.responsibilities} and should possess relevant certifications, including ${jobDescription.certifications}. Additionally, ${jobDescription.additionalReasons} provide further incentives for the right candidate. This position is classified as a ${jobDescription.jobTypeID} job, located in ${jobDescription.location}, with a notice period of ${jobDescription.noticePeriodID}. We currently have ${jobDescription.openPositions} open positions and welcome enthusiastic candidates to apply.

        - Budget: ${updateTracker.budgetID}
        - Priority: ${updateTracker.priorityID}
        - Expected Timeline: ${updateTracker.expectedTimeline}
        - Level 1 Interview Panel: ${updateTracker.level1InterviewPanelID}
        - Level 1 Panel Interview Slots: ${updateTracker.level1PanelInterviewSlots}
        - Level 2 Interview Panel: ${updateTracker.level2InterviewPanelID}
        - Level 2 Panel Interview Slots: ${updateTracker.level2PanelInterviewSlots}
    `;
}
