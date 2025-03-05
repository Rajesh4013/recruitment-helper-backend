import { employeeRepository } from '../repos/employee.repos.js';
import { EmployeeQueryParams, GetEmployeesResponse, GetEmployeeResponse } from '../types/employee.types.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class EmployeeService {
    async getManagerHierarchy(employeeId: number) {
        const managers = [];
        let currentEmployeeId = employeeId;

        while (currentEmployeeId) {
            const employee = await prisma.employee.findUnique({
                where: { EmployeeID: currentEmployeeId },
                select: { ManagerEmployeeID: true }
            });

            if (employee && employee.ManagerEmployeeID) {
                managers.push(employee.ManagerEmployeeID);
                currentEmployeeId = employee.ManagerEmployeeID;
            } else {
                break;
            }
        }

        return managers;
    }

    async getEmailsByEmployeeIds(employeeIds: number[]) {
        const logins = await prisma.login.findMany({
            where: { EmployeeID: { in: employeeIds } },
            select: { Email: true }
        });

        return logins.map(login => login.Email);
    }

    async getHREmails() {
        const hrLogins = await prisma.login.findMany({
            where: { Role: 'Recruiter' },
            select: { Email: true }
        });

        return hrLogins.map(login => login.Email);
    }
}

export default new EmployeeService();

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
