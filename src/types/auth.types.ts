import { Request } from 'express';

export type UserRole = 'Admin' | 'TeamLead' | 'Recruiter' | 'Manager';

export interface SignupRequest {
    employeeId: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    designation?: string;
    departmentId?: number;
    role: UserRole;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    data?: {
        token: string;
        employee: {
            EmployeeID: number;
            FirstName: string;
            LastName: string;
            Email: string;
            Role: UserRole;
        };
    };
    message?: string;
}

export interface JwtPayload {
    name: string;
    employeeId: number;
    email: string;
    role: UserRole;
}

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
}

export interface SignupResponse {
    success: boolean;
    data?: {
        employee: {
            EmployeeID: number;
            FirstName: string;
            LastName: string;
            Role: UserRole;
        };
    };
    message?: string;
} 