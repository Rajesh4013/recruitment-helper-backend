import { PrismaClient, Prisma } from '@prisma/client';
import { prisma } from '../utils/prisma.js';

const prismaClient = new PrismaClient();

export class ResourceRequestRepository {

    async getJobDescriptionIdByResourceRequestId(requestId: number) {
        return prismaClient.resourceRequests.findUnique({
            where: { ResourceRequestID: requestId },
            select: { JobDescriptionID: true }
        });
    }

    async createResourceRequest(data: Prisma.ResourceRequestsCreateInput) {
        console.log('ResourceRequestRepository.createResourceRequest data:', data);
        return prismaClient.resourceRequests.create({
            data,
        });
    }

    async getEmployeeRole(employeeId: number) {
        const employee = await prismaClient.employee.findUnique({
            where: { EmployeeID: employeeId },
            select: { Login: { select: { Role: true } }, DepartmentID: true }
        });
        return employee;
    }

    async getResourceRequestsByEmployeeId(employeeId: number, role: string, departmentId: number) {
        if (role === 'Recruiter' || role === 'Admin') {
            return prismaClient.resourceRequests.findMany({
                include: {
                    Employee: true
                }
            });
        } else if (role === 'Manager') {
            return prismaClient.resourceRequests.findMany({
                where: {
                    OR: [
                        { EmployeeID: employeeId },
                        { Employee: { DepartmentID: departmentId, Login: { Role: 'TeamLead' } } },
                    ]
                },
                include: {
                    Employee: true
                }
            });
        } else if (role === 'TeamLead') {
            const resourceRequests = await prismaClient.resourceRequests.findMany({
                where: { EmployeeID: employeeId },
            });

            const jobDescriptionIds = resourceRequests.map(request => request.JobDescriptionID);

            const updateTrackers = await Promise.all(jobDescriptionIds.map(id =>
                prismaClient.updateTracker.findFirst({
                    where: { JobDescriptionID: id },
                    orderBy: { UpdatedAt: 'desc' },
                    select: {
                        JobDescriptionID: true,
                        Status: true
                    }
                })
            ));

            const updateTrackerMap: { [key: number]: string | null } = updateTrackers.reduce((map: { [key: number]: string | null }, tracker) => {
                if (tracker) {
                    map[tracker?.JobDescriptionID] = tracker?.Status;
                }
                return map;
            }, {});

            const updatedResourceRequests = resourceRequests.map(request => {
                const { Status, ...rest } = request; // remove the existing Status property
                return {
                    ...rest,
                    Status: updateTrackerMap[request.JobDescriptionID] || null
                };
            });

            return updatedResourceRequests;
        }
    }

    async getResourceRequestById(requestId: number) {
        return prismaClient.resourceRequests.findUnique({
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
        return prismaClient.resourceRequests.findMany({
            where: { JobDescriptionID: jobDescriptionId },
            include: {
                Employee: true,
            }
        });
    }

    async updateResourceRequest(requestId: number, data: Prisma.ResourceRequestsUpdateInput) {
        return prismaClient.resourceRequests.update({
            where: { ResourceRequestID: requestId },
            data
        });
    }

    async deleteResourceRequest(requestId: number) {
        return prismaClient.resourceRequests.delete({
            where: { ResourceRequestID: requestId }
        });
    }

    async getEmployeeIdByJobDescriptionId(jobDescriptionId: number) {
        return prismaClient.resourceRequests.findFirst({
            where: { JobDescriptionID: jobDescriptionId },
            select: { EmployeeID: true }
        });
    }

    async getResourceRequestsByEmployeeIdWithUpdateTracker(employeeId: number) {
        const resourceRequests = await prisma.resourceRequests.findMany({
            where: { EmployeeID: employeeId },
            include: {
                JobDescription: true
            }
        });

        const jobDescriptionIds = resourceRequests.map(request => request.JobDescriptionID);

        const updateTrackers = await prisma.updateTracker.findMany({
            where: { JobDescriptionID: { in: jobDescriptionIds } },
            orderBy: { UpdatedAt: 'desc' }
        });

        return resourceRequests.map(request => ({
            ...request,
            updateTracker: updateTrackers.filter(tracker => tracker.JobDescriptionID === request.JobDescriptionID)
        }));
    }
}
