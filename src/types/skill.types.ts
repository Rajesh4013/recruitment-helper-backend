export interface Skill {
    SkillID: number;
    SkillName: string;
}

export interface SkillQueryParams {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: keyof Skill;
    sortOrder?: 'asc' | 'desc';
}

export interface GetSkillsResponse {
    success: boolean;
    data: Skill[];
    message?: string;
    pagination?: {
        total: number;
        page: number;
        limit: number;
    };
}

export interface GetSkillResponse {
    success: boolean;
    data: Skill | null;
    message?: string;
} 