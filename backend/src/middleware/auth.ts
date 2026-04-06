import type { Request, Response, NextFunction } from 'express';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export type AuthedRequest = Request & { adminId?: number };

export function requireAdmin(req: AuthedRequest, res: Response, next: NextFunction) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ error: 'Server misconfiguration' });
  }
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const token = header.slice(7);
    const payload = jwt.verify(token, secret) as JwtPayload;
    const sub = payload.sub;
    const id = typeof sub === 'string' ? Number.parseInt(sub, 10) : Number(sub);
    if (!Number.isFinite(id)) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    req.adminId = id;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
