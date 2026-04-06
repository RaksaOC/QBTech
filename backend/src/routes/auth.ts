import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { admins } from '../db/schema.js';

export const authRouter = Router();

authRouter.post('/login', async (req, res) => {
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  const [admin] = await db.select().from(admins).where(eq(admins.email, email)).limit(1);
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ sub: admin.id }, secret, { expiresIn: '7d' });
  return res.json({
    token,
    admin: { id: admin.id, email: admin.email },
  });
});
