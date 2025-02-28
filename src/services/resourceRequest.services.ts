import { ResourceRequestRepository } from '../repos/resourceRequest.repos.js';
import { Prisma } from '@prisma/client';
import { CreateResourceRequest } from '../types/requests.types.js';

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
}

export default new ResourceRequestService();
