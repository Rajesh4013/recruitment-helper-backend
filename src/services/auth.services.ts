import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { LoginCredentials, LoginResponse, SignupRequest, SignupResponse, JwtPayload, UserRole } from '../types/auth.types.js';
import { authRepository } from '../repos/auth.repos.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authService = {
    async login(credentials: LoginCredentials): Promise<LoginResponse> {
        try {
            const login = await authRepository.findUserByEmail(credentials.email);

            if (!login) {
                return {
                    success: false,
                    message: 'Invalid email or password'
                };
            }

            const validPassword = await bcrypt.compare(credentials.password, login.PasswordHash);
            if (!validPassword) {
                return {
                    success: false,
                    message: 'Invalid email or password'
                };
            }

            const payload: JwtPayload = {
                name: `${login.Employee.FirstName} ${login.Employee.LastName}`,
                employeeId: login.EmployeeID,
                email: login.Email,
                role: login.Role as UserRole
            };

            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

            await authRepository.updateLastLogin(login.EmployeeID);

            return {
                success: true,
                data: {
                    token,
                    employee: {
                        EmployeeID: login.Employee.EmployeeID,
                        FirstName: login.Employee.FirstName,
                        LastName: login.Employee.LastName,
                        Email: login.Email,
                        Role: login.Role as UserRole
                    }
                },
                message: 'Login successful'
            };
        } catch (error) {
            throw error;
        }
    },

    async signup(data: SignupRequest): Promise<SignupResponse> {
        try {
            const existingUser = await authRepository.findUserByEmail(data.email);

            if (existingUser) {
                return {
                    success: false,
                    message: 'Email already registered'
                };
            }

            const result = await authRepository.createUser(data);

            return {
                success: true,
                data: {
                    employee: {
                        EmployeeID: result.employee.EmployeeID,
                        FirstName: result.employee.FirstName,
                        LastName: result.employee.LastName,
                        Role: result.login.Role as UserRole
                    }
                },
                message: 'User registered successfully'
            };
        } catch (error) {
            throw error;
        }
    }
};