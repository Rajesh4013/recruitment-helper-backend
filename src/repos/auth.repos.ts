import { prisma } from '../utils/prisma.js';
import bcrypt from 'bcrypt';
import { UserRole } from '../types/auth.types.js';

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

    async createLoginForEmployee(signupData: any) {
        const hashedPassword = await bcrypt.hash(signupData.PasswordHash, SALT_ROUNDS);
        console.log(signupData);
        return await prisma.login.create({
            data: {
                Employee: {
                    connect: {
                        EmployeeID: signupData.EmployeeID
                    }   
                },
                // EmployeeID: signupData.EmployeeID,
                Email: signupData.Email,
                PasswordHash: hashedPassword,
                Role: signupData.Role as UserRole
            }
        });
    }
}; 