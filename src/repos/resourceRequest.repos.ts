import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class ResourceRequestRepository {

    async getJobDescriptionIdByResourceRequestId(requestId: number) {
        return prisma.resourceRequests.findUnique({
            where: { ResourceRequestID: requestId },
            select: { JobDescriptionID: true }
        });
    }

    async createResourceRequest(data: Prisma.ResourceRequestsCreateInput) {
        console.log('ResourceRequestRepository.createResourceRequest data:', data);
        return prisma.resourceRequests.create({
            data,
        });
    }

    async getEmployeeRole(employeeId: number) {
        const employee = await prisma.employee.findUnique({
            where: { EmployeeID: employeeId },
            select: { Login: { select: { Role: true } }, DepartmentID: true }
        });
        return employee;
    }

    async getResourceRequestsByEmployeeId(employeeId: number, role: string, departmentId: number) {
        if (role === 'Recruiter' || role === 'Admin') {
            return prisma.resourceRequests.findMany();
        } else if (role === 'Manager') {
            return prisma.resourceRequests.findMany({
                where: {
                    OR: [
                        { EmployeeID: employeeId },
                        { Employee: { DepartmentID: departmentId, Login: { Role: 'TeamLead' } } },
                    ]
                }
            });
        } else {
            return prisma.resourceRequests.findMany({
                where: { EmployeeID: employeeId }
            });
        }
    }

    async getResourceRequestById(requestId: number) {
        return prisma.resourceRequests.findUnique({
            where: { ResourceRequestID: requestId },
            include: {
                JobDescription: {
                    include: {
                        ModeOfWork: {
                            select: { ModeOfWorkName: true }
                        },
                        Education: {
                            select: { EducationName: true }
                        },
                        JobType: {
                            select: { JobTypeName: true }
                        },
                        NoticePeriod: {
                            select: { NoticePeriodName: true }
                        }
                    }
                },
                Employee: {
                    include: {
                        Department: {
                            select: { DepartmentName: true }
                        }
                    }
                }
            }
        });
    }

    async getResourceRequestsByJobDescriptionId(jobDescriptionId: number) {
        return prisma.resourceRequests.findMany({
            where: { JobDescriptionID: jobDescriptionId },
            include: {
                Employee: true,
            }
        });
    }

    async updateResourceRequest(requestId: number, data: Prisma.ResourceRequestsUpdateInput) {
        return prisma.resourceRequests.update({
            where: { ResourceRequestID: requestId },
            data
        });
    }

    async deleteResourceRequest(requestId: number) {
        return prisma.resourceRequests.delete({
            where: { ResourceRequestID: requestId }
        });
    }
}
