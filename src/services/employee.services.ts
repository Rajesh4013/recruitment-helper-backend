import { employeeRepository } from '../repos/employee.repos.js';
import { EmployeeQueryParams, GetEmployeesResponse, GetEmployeeResponse } from '../types/employee.types.js';

export const employeeService = {
    async getAllEmployees(params: EmployeeQueryParams): Promise<GetEmployeesResponse> {
        try {
            const { employees, total } = await employeeRepository.getAllEmployees(params);
            
            return {
                success: true,
                data: employees.map(emp => ({
                    EmployeeID: emp.EmployeeID,
                    FirstName: emp.FirstName,
                    LastName: emp.LastName,
                    Email: emp.Email,
                    Designation: emp.Designation,
                    CreatedAt: emp.CreatedAt,
                    Department: emp.Department ? {
                        DepartmentName: emp.Department.DepartmentName
                    } : null,
                    Manager: emp.Employee ? {
                        EmployeeID: emp.Employee.EmployeeID,
                        FirstName: emp.Employee.FirstName,
                        LastName: emp.Employee.LastName,
                        Designation: emp.Employee.Designation!,
                        Email: emp.Employee.Email
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
                    Email: employee.Email,
                    Designation: employee.Designation,
                    CreatedAt: employee.CreatedAt,
                    Department: employee.Department ? {
                        DepartmentName: employee.Department.DepartmentName
                    } : null,
                    Manager: employee.Employee ? {
                        EmployeeID: employee.Employee.EmployeeID,
                        FirstName: employee.Employee.FirstName,
                        LastName: employee.Employee.LastName,
                        Designation: employee.Employee.Designation!,
                        Email: employee.Employee.Email
                    } : null
                },
                message: 'Employee retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    }
};
