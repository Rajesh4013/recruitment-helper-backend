export interface Department {
    DepartmentID: number;
    DepartmentName: string;
}

export interface GetDepartmentsResponse {
    success: boolean;
    data: Department[];
    message?: string;
}

export interface GetDepartmentResponse {
    success: boolean;
    data: Department | null;
    message?: string;
} 