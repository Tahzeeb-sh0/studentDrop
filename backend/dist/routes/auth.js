import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Models } from '../models/index.js';
import { config } from '../config/index.js';
const router = Router();
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password)
        return res.status(400).json({ message: 'Missing fields' });
    const existing = await Models.User.findOne({ where: { email } });
    if (existing)
        return res.status(409).json({ message: 'Email already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await Models.User.create({ name, email, passwordHash, role: role || 'student' });
    res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({ message: 'Missing fields' });
    const user = await Models.User.findOne({ where: { email } });
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
        return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});
router.post('/logout', async (_req, res) => {
    // Stateless JWT: client removes token. For stateful revoke, we would blacklist in Redis.
    res.json({ message: 'Logged out' });
});
router.post('/reset-password', async (_req, res) => {
    // Stub for email reset flow. Will integrate with SendGrid later.
    res.json({ message: 'Password reset link sent if email exists' });
});
export default router;
