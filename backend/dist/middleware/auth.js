import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
export function requireAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token)
        return res.status(401).json({ message: 'Unauthorized' });
    try {
        const payload = jwt.verify(token, config.jwtSecret);
        req.user = payload;
        next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
export function requireRole(roles) {
    return (req, res, next) => {
        const user = req.user;
        if (!user)
            return res.status(401).json({ message: 'Unauthorized' });
        if (!roles.includes(user.role))
            return res.status(403).json({ message: 'Forbidden' });
        next();
    };
}
