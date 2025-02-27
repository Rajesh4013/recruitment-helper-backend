import { departmentRepository } from '../repos/department.repos.js';
import { GetDepartmentsResponse, GetDepartmentResponse } from '../types/department.types.js';
import { 
    CreateDepartmentRequest, 
    UpdateDepartmentRequest, 
    CreateUpdateDepartmentResponse,
    DeleteDepartmentResponse 
} from '../types/department.types.js';

export const departmentService = {
    async getAllDepartments(): Promise<GetDepartmentsResponse> {
        try {
            const departments = await departmentRepository.getAllDepartments();
            
            return {
                success: true,
                data: departments,
                message: 'Departments retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async getDepartmentById(id: number): Promise<GetDepartmentResponse> {
        try {
            const department = await departmentRepository.getDepartmentById(id);
            
            if (!department) {
                return {
                    success: false,
                    data: null,
                    message: 'Department not found'
                };
            }

            return {
                success: true,
                data: department,
                message: 'Department retrieved successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async createDepartment(data: CreateDepartmentRequest): Promise<CreateUpdateDepartmentResponse> {
        try {
            const department = await departmentRepository.createDepartment(data);
            
            return {
                success: true,
                data: department,
                message: 'Department created successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async updateDepartment(id: number, data: UpdateDepartmentRequest): Promise<CreateUpdateDepartmentResponse> {
        try {
            const existingDepartment = await departmentRepository.getDepartmentById(id);
            
            if (!existingDepartment) {
                return {
                    success: false,
                    data: null,
                    message: 'Department not found'
                };
            }

            const department = await departmentRepository.updateDepartment(id, data);
            
            return {
                success: true,
                data: department,
                message: 'Department updated successfully'
            };
        } catch (error) {
            throw error;
        }
    },

    async deleteDepartment(id: number): Promise<DeleteDepartmentResponse> {
        try {
            const existingDepartment = await departmentRepository.getDepartmentById(id);
            
            if (!existingDepartment) {
                return {
                    success: false,
                    message: 'Department not found'
                };
            }

            await departmentRepository.deleteDepartment(id);
            
            return {
                success: true,
                message: 'Department deleted successfully'
            };
        } catch (error) {
            throw error;
        }
    }
}; 