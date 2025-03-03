import { ResourceRequestRepository } from '../repos/resourceRequest.repos.js';
import { Prisma } from '@prisma/client';
import { CreateResourceRequest } from '../types/requests.types.js';
import updateTrackerServices from './updateTracker.services.js';

class ResourceRequestService {
    private repository: ResourceRequestRepository;

    constructor() {
        this.repository = new ResourceRequestRepository();
    }

    async createResourceRequest(id: number, data: CreateResourceRequest) {
        const resourceRequest: Prisma.ResourceRequestsCreateInput = {
            JobDescription: {
                connect: {
                    JobDescriptionID: id
                }
            },
            Employee: {
                connect: {
                    EmployeeID: parseInt(data.requestedBy)
                }
            },
            RequestTitle: data.requestTitle
        }
        return this.repository.createResourceRequest(resourceRequest);
    }

    async getResourceRequestsByEmployeeId(employeeId: number) {
        const employee = await this.repository.getEmployeeRole(employeeId);
        const role = employee?.Login?.Role ?? '';
        const departmentId = employee?.DepartmentID ?? 0;
        return this.repository.getResourceRequestsByEmployeeId(employeeId, role, departmentId);
    }

    async getResourceRequestById(requestId: number) {
        const resourceRequest = await this.repository.getResourceRequestById(requestId);
        if (resourceRequest) {
            const updateTracker = await updateTrackerServices.getUpdateTrackersByJobDescriptionId(resourceRequest.JobDescriptionID);
            return { ...resourceRequest, updateTracker };
        }
        return resourceRequest;
    }

    async getResourceRequestsByJobDescriptionId(jobDescriptionId: number) {
        return this.repository.getResourceRequestsByJobDescriptionId(jobDescriptionId);
    }

    async updateResourceRequest(requestId: number, data: Prisma.ResourceRequestsUpdateInput) {
        return this.repository.updateResourceRequest(requestId, data);
    }

    async deleteResourceRequest(requestId: number) {
        return this.repository.deleteResourceRequest(requestId);
    }
}

export default new ResourceRequestService();
