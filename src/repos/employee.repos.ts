import { PrismaClient } from '@prisma/client';
import { EmployeeQueryParams } from '../types/employee.types';

const prisma = new PrismaClient();

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

        const where = {
            AND: [
                departmentId ? { DepartmentID: departmentId } : {},
                designation ? { Designation: designation } : {},
                employeeIdSearch ? {
                    EmployeeID: {
                        in: await prisma.employee.findMany({
                            where: {
                                EmployeeID: {
                                    in: await prisma.employee
                                        .findMany({
                                            where: {
                                                EmployeeID: {
                                                    gt: 0
                                                }
                                            },
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
                    }
                } : {},
                search ? {
                    OR: [
                        { FirstName: { contains: search } },
                        { LastName: { contains: search } },
                        { Email: { contains: search } }
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
                        DepartmentName: true
                    }
                },
                Employee: {
                    select: {
                        EmployeeID: true,
                        FirstName: true,
                        LastName: true,
                        Designation: true,
                        Email: true
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
                        DepartmentName: true
                    }
                },
                Employee: {
                    select: {
                        EmployeeID: true,
                        FirstName: true,
                        LastName: true,
                        Designation: true,
                        Email: true
                    }
                }
            }
        });

        return employee;
    }
};
