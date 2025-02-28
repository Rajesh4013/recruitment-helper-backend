export interface Employee {
    EmployeeID: number;
    FirstName: string;
    LastName: string;
    Designation?: string | null;
    CreatedAt?: Date | null;
    Email?: string | null;
}

export interface EmployeeDetails extends Employee {
    Department?: {
        DepartmentID: number;
        DepartmentName: string;
    } | null;
    Manager?: {
        EmployeeID: number;
        FirstName: string;
        LastName: string;
        Designation: string;
    } | null;
}

export interface PaginationInfo {
    total: number;
    page: number;
    limit: number;
}

export interface GetEmployeesResponse {
    success: boolean;
    data: EmployeeDetails[];
    message?: string;
    pagination: PaginationInfo;
}

export interface EmployeeQueryParams {
    employeeIdSearch?: string;
    departmentId?: number;
    designation?: string;
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: keyof Employee;
    sortOrder?: 'asc' | 'desc';
}

export interface ApiErrorResponse {
    success: false;
    message: string;
    error?: any;
}

export interface GetEmployeeResponse {
    success: boolean;
    data: EmployeeDetails | null;
    message?: string;
}