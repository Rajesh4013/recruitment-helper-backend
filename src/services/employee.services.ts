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
    }
};
