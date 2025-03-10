import { prisma } from '../utils/prisma.js';
import { EmployeeQueryParams } from '../types/employee.types.js';
import bcrypt from 'bcrypt';

export const employeeRepository = {

    async updateEmployeeProfile(employeeId: number, employeeDetails: any) {
        if (employeeDetails.CurrentPassword && employeeDetails.NewPassword) {
            const employeeLogin = await prisma.login.findUnique({
                where: { EmployeeID: employeeId },
                select: { PasswordHash: true }
            });

            if (!employeeLogin) {
                throw new Error('Employee login not found');
            }

            const isPasswordMatch = await bcrypt.compare(employeeDetails.CurrentPassword, employeeLogin.PasswordHash);
            if (!isPasswordMatch) {
                throw new Error('Current password is incorrect');
            }

            const newPasswordHash = await bcrypt.hash(employeeDetails.NewPassword, 10);
            await prisma.login.update({
                where: { EmployeeID: employeeId },
                data: { PasswordHash: newPasswordHash }
            });

            delete employeeDetails.CurrentPassword;
            delete employeeDetails.NewPassword;
        }

        const existingEmployee = await prisma.employee.findUnique({
            where: { EmployeeID: employeeId }
        });

        if (!existingEmployee) {
            throw new Error('Employee not found');
        }

        const updatedEmployee = await prisma.employee.update({
            where: { EmployeeID: employeeId },
            data: employeeDetails
        });

        return updatedEmployee;
    },

    async createEmployee(employeeDetails: any) {
        console.log('EmployeeRepository.createEmployee data:', employeeDetails);
        // employeeDetails.id = "8829BH";
        const employee = await prisma.employee.create({ data: employeeDetails });
        console.log(employee);
        return employee;
    },

    async getAllEmployees(params: EmployeeQueryParams) {
        const {
            page = 1,
            limit = 10,
            search,
            departmentId,
            designation,
            employeeIdSearch,
            sortBy = 'EmployeeID',
            sortOrder = 'asc',
            searchBy
        } = params;

        const skip = (page - 1) * limit;

        // Get employee IDs that match the employeeId search
        const matchingEmployeeIds = employeeIdSearch ?
            await prisma.employee.findMany({
                where: {
                    EmployeeID: {
                        in: await prisma.employee
                            .findMany({
                                where: { EmployeeID: { gt: 0 } },
                                select: { EmployeeID: true }
                            })
                            .then(ids =>
                                ids
                                    .filter(e => e.EmployeeID.toString().includes(employeeIdSearch))
                                    .map(e => e.EmployeeID)
                            )
                    }
                },
                select: { EmployeeID: true }
            }).then(ids => ids.map(e => e.EmployeeID))
            : undefined;

        const where = {
            AND: [
                departmentId ? { DepartmentID: departmentId } : {},
                designation ? { Designation: designation } : {},
                employeeIdSearch ? { EmployeeID: { in: matchingEmployeeIds } } : {},
                search ? {
                    OR: [
                        { FirstName: { contains: search } },
                        { LastName: { contains: search } },
                        {
                            Login: {
                                Email: { contains: search }
                            }
                        }
                    ]
                } : {},
                searchBy === 'Manager' ? {
                    Login: {
                        Role: { in: ['TeamLead', 'Manager', 'Admin'] }
                    }
                } : {}
            ]
        };

        const employees = await prisma.employee.findMany({
            where,
            skip,
            take: limit,
            orderBy: { [sortBy]: sortOrder },
            include: {
                Department: {
                    select: {
                        DepartmentID: true,
                        DepartmentName: true
                    }
                },
                Login: {
                    select: {
                        Email: true,
                        Role: true
                    }
                },
                Employee: {
                    select: {
                        EmployeeID: true,
                        FirstName: true,
                        LastName: true,
                        Designation: true
                    }
                }
            }
        });

        const total = await prisma.employee.count({ where });

        return { employees, total };
    },

    async getEmployeeById(id: number) {
        const employee = await prisma.employee.findUnique({
            where: { EmployeeID: id },
            include: {
                Department: {
                    select: {
                        DepartmentID: true,
                        DepartmentName: true
                    }
                },
                Employee: {
                    select: {
                        EmployeeID: true,
                        FirstName: true,
                        LastName: true,
                        Designation: true,
                    }
                }
            }
        });

        return employee;
    },

    async getEmployeeProfileInfoByID(id: number) {
        const employee = await prisma.employee.findUnique({
            where: { EmployeeID: id },
            include: {
                Department: {
                    select: {
                        DepartmentID: true,
                        DepartmentName: true
                    }
                },
                Employee: true,
                Login: {
                    select: {
                        Email: true,
                        Role: true
                    }
                }
            }
        });

        return employee;
    },

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
    },

    async getEmailsByEmployeeIds(employeeIds: number[]) {
        const logins = await prisma.login.findMany({
            where: { EmployeeID: { in: employeeIds } },
            select: { Email: true }
        });

        return logins.map(login => login.Email);
    },

    async getHREmails() {
        const hrLogins = await prisma.login.findMany({
            where: { Role: 'Recruiter' },
            select: { Email: true }
        });

        return hrLogins.map(login => login.Email);
    }
};
