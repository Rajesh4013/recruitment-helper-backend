import { prisma } from '../utils/prisma.js';
import bcrypt from 'bcrypt';
import { SignupRequest, UserRole } from '../types/auth.types.js';

const SALT_ROUNDS = 10;

export const authRepository = {
    async findUserByEmail(email: string) {
        return await prisma.login.findUnique({
            where: { Email: email },
            select: {
                EmployeeID: true,
                Email: true,
                PasswordHash: true,
                Role: true,
                Employee: {
                    select: {
                        EmployeeID: true,
                        FirstName: true,
                        LastName: true,
                        Designation: true,
                        CreatedAt: true
                    }
                }
            }
        });
    },

    async updateLastLogin(employeeId: number) {
        return await prisma.login.update({
            where: { EmployeeID: employeeId },
            data: { LastLogin: new Date() }
        });
    },

    async createUser(data: SignupRequest) {
        const result = await prisma.$transaction(async (prisma) => {
            const employeeData: any = {
                EmployeeID: data.employeeId,
                FirstName: data.firstName,
                LastName: data.lastName,
                Email: data.email,
                CreatedAt: new Date()
            };

            if (data.designation) {
                employeeData.Designation = data.designation;
            }
            if (data.departmentId) {
                employeeData.DepartmentID = data.departmentId;
            }

            const employee = await prisma.employee.create({
                data: employeeData
            });

            const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
            
            const login = await prisma.login.create({
                data: {
                    EmployeeID: employee.EmployeeID,
                    Email: data.email,
                    PasswordHash: passwordHash,
                    Role: data.role,
                    LastLogin: new Date()
                }
            });

            return { employee, login }; 
        });

        return result;
    }
}; 