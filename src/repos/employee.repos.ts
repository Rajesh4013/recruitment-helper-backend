import { prisma } from '../utils/prisma.js';
import { EmployeeQueryParams } from '../types/employee.types.js';

export const employeeRepository = {
    async getAllEmployees(params: EmployeeQueryParams) {
        const {
            page = 1,
            limit = 10,
            search,
            departmentId,
            designation,
            employeeIdSearch,
            sortBy = 'EmployeeID',
            sortOrder = 'asc'
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
                        Email: true
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
                        Designation: true
                    }
                }
            }
        });

        return employee;
    }
};
