import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { UserRole } from '../models/User.js';

export interface AuthPayload {
	id: number;
	role: UserRole;
	email: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
	const header = req.headers.authorization || '';
	const token = header.startsWith('Bearer ') ? header.slice(7) : null;
	if (!token) return res.status(401).json({ message: 'Unauthorized' });
	try {
		const payload = jwt.verify(token, config.jwtSecret) as AuthPayload;
		(req as any).user = payload;
		next();
	} catch {
		return res.status(401).json({ message: 'Invalid token' });
	}
}

export function requireRole(roles: UserRole[]) {
	return (req: Request, res: Response, next: NextFunction) => {
		const user = (req as any).user as AuthPayload | undefined;
		if (!user) return res.status(401).json({ message: 'Unauthorized' });
		if (!roles.includes(user.role)) return res.status(403).json({ message: 'Forbidden' });
		next();
	};
}
