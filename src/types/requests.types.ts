export type CreateResourceRequest = {
    requestTitle: string;
    requestedBy: string;
};

export type CreateJobDescription = {
    modeOfWorkID: number;
    educationID: number;
    experience: number;
    requiredTechnicalSkills?: string;
    preferredTechnicalSkills?: string;
    responsibilities?: string;
    certifications?: string;
    additionalReasons?: string;
    role: string;
    jobTypeID: number;
    location?: string;
    noticePeriodID: number;
    openPositions: number;
};

export type CreateUpdateTracker = {
    employeeID: number;
    budgetID: number;
    priorityID: number;
    expectedTimeline: string;
    level1InterviewPanelID: number;
    level1PanelInterviewSlots: string;
    level2InterviewPanelID: number;
    level2PanelInterviewSlots: string;
};