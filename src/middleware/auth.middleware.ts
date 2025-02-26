import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, JwtPayload, UserRole } from '../types/auth.types.js';
import { ApiErrorResponse } from '../types/employee.types.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Access denied. No token provided.',
        };
        return res.status(401).json(errorResponse);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        (req as AuthenticatedRequest).user = decoded;
        next();
    } catch (error) {
        const errorResponse: ApiErrorResponse = {
            success: false,
            message: 'Invalid token.',
        };
        return res.status(403).json(errorResponse);
    }
};

export const authorizeRoles = (...allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const authReq = req as AuthenticatedRequest;
        if (!authReq.user || !allowedRoles.includes(authReq.user.role)) {
            const errorResponse: ApiErrorResponse = {
                success: false,
                message: 'Access denied. Insufficient permissions.',
            };
            return res.status(403).json(errorResponse);
        }
        next();
    };
}; 