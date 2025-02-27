export interface Department {
    DepartmentID: number;
    DepartmentName: string;
}

export interface CreateDepartmentRequest {
    departmentName: string;
}

export interface UpdateDepartmentRequest {
    departmentName: string;
}

export interface CreateUpdateDepartmentResponse {
    success: boolean;
    data: Department | null;
    message?: string;
}

export interface DeleteDepartmentResponse {
    success: boolean;
    message: string;
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