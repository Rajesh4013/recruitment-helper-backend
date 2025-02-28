import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export class ResourceRequestRepository {

    async createResourceRequest(data: Prisma.ResourceRequestsCreateInput) {
        console.log('ResourceRequestRepository.createResourceRequest data:', data);
        return prisma.resourceRequests.create({
            data,
        });
    }
}
