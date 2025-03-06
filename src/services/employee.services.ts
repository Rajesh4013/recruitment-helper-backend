import { authRepository } from '../repos/auth.repos.js';
import { employeeRepository } from '../repos/employee.repos.js';
import { EmployeeQueryParams, GetEmployeesResponse, GetEmployeeResponse } from '../types/employee.types.js';
import { Prisma } from '@prisma/client';

export const employeeService = {
    async getManagerHierarchy(employeeId: number) {
        return await employeeRepository.getManagerHierarchy(employeeId);
    },

    async getEmailsByEmployeeIds(employeeIds: number[]) {
        return await employeeRepository.getEmailsByEmployeeIds(employeeIds);
    },

    async getHREmails() {
        return await employeeRepository.getHREmails();
    },

    async addEmployee(employeeData: any) {
        const employeeDetails: Prisma.EmployeeCreateInput = {
            EmployeeID: parseInt(employeeData.EmployeeID, 10),
            FirstName: employeeData.FirstName,
            LastName: employeeData.LastName,
            Designation: employeeData.Designation || null,
            Department: {
                connect: {
                    DepartmentID: parseInt(employeeData.DepartmentID, 10)
                }
            },
            other_Employee: {
                connect: {
                    EmployeeID: parseInt(employeeData.ManagerEmployeeID, 10)
                }
            },
            ProfilePicture: employeeData.ProfilePicture || null,
            MobileNumber: employeeData.MobileNumber || null,
            Address: employeeData.Address || null,
            Gender: employeeData.Gender || null,
            YearsOfExperience: employeeData.YearsOfExperience || 0,
            JoiningDate: new Date(employeeData.JoiningDate) || new Date(),
            IsAdmin: employeeData.IsAdmin || false,
        }

        const createEmployeeResponse = await employeeRepository.createEmployee(employeeDetails);
        console.log(createEmployeeResponse);
        const loginDetails: Prisma.LoginCreateInput = {
            Employee: {
                connect: {
                    EmployeeID: createEmployeeResponse.EmployeeID,
                }
            },
            Email: employeeData.Email,
            PasswordHash: employeeData.Password,
            Role: employeeData.Role || 'Employee',
        }

        const createLoginResponse = await authRepository.createLoginForEmployee(loginDetails);

        return !createEmployeeResponse ? null : createEmployeeResponse
    },

    async getAllEmployees(params: EmployeeQueryParams): Promise<GetEmployeesResponse> {
        try {
            const { employees, total } = await employeeRepository.getAllEmployees(params);

            return {
                success: true,
                data: employees.map(emp => ({
                    EmployeeID: emp.EmployeeID,
                    FirstName: emp.FirstName,
                    LastName: emp.LastName,
                    Designation: emp.Designation,
                    CreatedAt: emp.CreatedAt,
                    Email: emp.Login?.Email,
                    Department: emp.Department ? {
                        DepartmentID: emp.Department.DepartmentID,
                        DepartmentName: emp.Department.DepartmentName
                    } : null,
                    Manager: emp.Employee ? {
                        EmployeeID: emp.Employee.EmployeeID,
                        FirstName: emp.Employee.FirstName,
                        LastName: emp.Employee.LastName,
                        Designation: emp.Employee.Designation!,
                    } : null
                })),
                message: 'Employees retrieved successfully',
                pagination: {
                    total,
                    page: params.page || 1,
                    limit: params.limit || 10
                }
            };
        } catch (error) {
            throw error;
        }
    },

    async getEmployeeById(id: number): Promise<GetEmployeeResponse> {
        try {
            const employee = await employeeRepository.getEmployeeById(id);

            if (!employee) {
                return {
                    success: false,
                    data: null,
                    message: 'Employee not found'
                };
            }

            return {
                success: true,
                data: {
                    EmployeeID: employee.EmployeeID,
                    FirstName: employee.FirstName,
                    LastName: employee.LastName,
                    Designation: employee.Designation,
                    CreatedAt: employee.CreatedAt,
                    Department: employee.Department ? {
                        DepartmentID: employee.Department.DepartmentID,
                        DepartmentName: employee.Department.DepartmentName
                    } : null,
                    Manager: employee.Employee ? {
                        EmployeeID: employee.Employee.EmployeeID,
                        FirstName: employee.Employee.FirstName,
                        LastName: employee.Employee.LastName,
                        Designation: employee.Employee.Designation!,
                    } : null
                },
                message: 'Employee retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async getEmployeeProfileByID(id: number) {
        const employee = await employeeRepository.getEmployeeProfileInfoByID(id);

        if (!employee) {
            return {
                success: false,
                data: null,
                message: 'Employee not found'
            };
        }
        
        const employeeProfileResponse = {
            Id: employee?.id,
            FirstName: employee?.FirstName,
            LastName: employee?.LastName,
            Email: employee?.Login?.Email,
            Role: employee?.Login?.Role,
            Designation: employee?.Designation,
            Department: employee?.Department?.DepartmentName,
            Manager: {
                ManagerName: employee?.Employee?.FirstName + ' ' + employee?.Employee?.LastName,
                ManagerID: employee?.Employee?.EmployeeID,
            },
            ProfilePicture: employee?.ProfilePicture,
            MobileNumber: employee?.MobileNumber,
            Address: employee?.Address,
            YearsOfExperience: employee?.YearsOfExperience,
            JoiningDate: employee?.JoiningDate?.toISOString().split('T')[0],
        }
        return {
            success: true, data: employeeProfileResponse, message: 'Employee profile retrieved successfully'
        };
    }
};