// Common interfaces for lookup tables
interface BaseLookup {
    success: boolean;
    message?: string;
}

export interface Education {
    EducationID: number;
    EducationName: string;
}

export interface InterviewSlot {
    InterviewSlotID: number;
    InterviewSlotName: string;
}

export interface JobType {
    JobTypeID: number;
    JobTypeName: string;
}

export interface ModeOfWork {
    ModeOfWorkID: number;
    ModeOfWorkName: string;
}

export interface NoticePeriod {
    NoticePeriodID: number;
    NoticePeriodName: string;
}

export interface Priority {
    PriorityID: number;
    PriorityName: string;
}

export interface BudgetRange {
    BudgetID: number;
    BudgetName: string;
}

export interface GetAllResponse<T> extends BaseLookup {
    data: T[];
}

export interface GetByIdResponse<T> extends BaseLookup {
    data: T | null;
} 