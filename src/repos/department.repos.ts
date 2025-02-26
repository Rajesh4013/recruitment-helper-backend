import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
    }
}; 