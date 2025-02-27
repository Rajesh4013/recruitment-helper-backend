import { prisma } from '../utils/prisma.js';
import { CreateDepartmentRequest, UpdateDepartmentRequest } from '../types/department.types.js';

export const departmentRepository = {
    async getAllDepartments() {
        const departments = await prisma.department.findMany({
            orderBy: {
                DepartmentName: 'asc'
            }
        });
        
        return departments;
    },

    async getDepartmentById(id: number) {
        const department = await prisma.department.findUnique({
            where: {
                DepartmentID: id
            }
        });

        return department;
    },

    async createDepartment(data: CreateDepartmentRequest) {
        const department = await prisma.department.create({
            data: {
                DepartmentName: data.departmentName
            }
        });
        return department;
    },

    async updateDepartment(id: number, data: UpdateDepartmentRequest) {
        const department = await prisma.department.update({
            where: {
                DepartmentID: id
            },
            data: {
                DepartmentName: data.departmentName
            }
        });
        return department;
    },

    async deleteDepartment(id: number) {
        await prisma.department.delete({
            where: {
                DepartmentID: id
            }
        });
    }
}; 