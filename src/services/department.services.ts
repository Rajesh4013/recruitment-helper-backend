import { departmentRepository } from '../repos/department.repos.js';
import { GetDepartmentsResponse, GetDepartmentResponse } from '../types/department.types.js';

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
    }
}; 