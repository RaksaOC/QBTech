import fs from 'node:fs';
import { Router } from 'express';
import { and, desc, eq, isNotNull, isNull, sql } from 'drizzle-orm';
import { db } from '../db/index.js';
import { jobs, messages } from '../db/schema.js';
import { requireAdmin } from '../middleware/auth.js';
import { absoluteResumePath } from '../lib/multer.js';

export const adminRouter = Router();
adminRouter.use(requireAdmin);

adminRouter.get('/stats', async (_req, res) => {
  const [jobCount] = await db.select({ c: sql<number>`count(*)::int` }).from(jobs);
  const [msgCount] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(messages)
    .where(isNull(messages.jobId));
  const [appCount] = await db
    .select({ c: sql<number>`count(*)::int` })
    .from(messages)
    .where(isNotNull(messages.jobId));
  res.json({
    jobs: jobCount?.c ?? 0,
    messages: msgCount?.c ?? 0,
    applications: appCount?.c ?? 0,
  });
});

adminRouter.get('/jobs', async (_req, res) => {
  const rows = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  res.json(rows);
});

adminRouter.post('/jobs', async (req, res) => {
  const { name, description, department, timeType, location } = req.body ?? {};
  if (
    typeof name !== 'string' ||
    typeof description !== 'string' ||
    typeof department !== 'string' ||
    typeof timeType !== 'string'
  ) {
    return res.status(400).json({ error: 'name, description, department, timeType required' });
  }
  const [row] = await db
    .insert(jobs)
    .values({
      name: name.trim(),
      description: description.trim(),
      department: department.trim(),
      timeType: timeType.trim(),
      location: typeof location === 'string' ? location.trim() || null : null,
    })
    .returning();
  res.status(201).json(row);
});

adminRouter.put('/jobs/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const { name, description, department, timeType, location } = req.body ?? {};
  const [existing] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  if (!existing) {
    return res.status(404).json({ error: 'Not found' });
  }
  const [row] = await db
    .update(jobs)
    .set({
      name: typeof name === 'string' ? name.trim() : existing.name,
      description: typeof description === 'string' ? description.trim() : existing.description,
      department: typeof department === 'string' ? department.trim() : existing.department,
      timeType: typeof timeType === 'string' ? timeType.trim() : existing.timeType,
      location:
        location === undefined
          ? existing.location
          : typeof location === 'string'
            ? location.trim() || null
            : null,
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, id))
    .returning();
  res.json(row);
});

adminRouter.delete('/jobs/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const deleted = await db.delete(jobs).where(eq(jobs.id, id)).returning();
  if (!deleted.length) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json({ ok: true });
});

adminRouter.get('/messages', async (req, res) => {
  const kind = req.query.kind;
  if (kind === 'contact') {
    const rows = await db
      .select()
      .from(messages)
      .where(isNull(messages.jobId))
      .orderBy(desc(messages.createdAt));
    return res.json(rows);
  }
  if (kind === 'application') {
    const rows = await db
      .select()
      .from(messages)
      .where(isNotNull(messages.jobId))
      .orderBy(desc(messages.createdAt));
    return res.json(rows);
  }
  const rows = await db.select().from(messages).orderBy(desc(messages.createdAt));
  res.json(rows);
});

adminRouter.get('/applications', async (_req, res) => {
  const rows = await db
    .select()
    .from(messages)
    .where(isNotNull(messages.jobId))
    .orderBy(desc(messages.createdAt));
  res.json(rows);
});

adminRouter.get('/jobs/:jobId/applications', async (req, res) => {
  const jobId = Number(req.params.jobId);
  if (!Number.isFinite(jobId)) {
    return res.status(400).json({ error: 'Invalid job id' });
  }
  const rows = await db
    .select()
    .from(messages)
    .where(and(eq(messages.jobId, jobId), isNotNull(messages.jobId)))
    .orderBy(desc(messages.createdAt));
  res.json(rows);
});

adminRouter.get('/messages/:id/resume', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const [row] = await db.select().from(messages).where(eq(messages.id, id)).limit(1);
  if (!row?.resumePath) {
    return res.status(404).json({ error: 'No resume for this message' });
  }
  const abs = absoluteResumePath(row.resumePath);
  if (!fs.existsSync(abs)) {
    return res.status(404).json({ error: 'File missing on disk' });
  }
  res.sendFile(abs);
});

adminRouter.delete('/messages/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const [row] = await db.select().from(messages).where(eq(messages.id, id)).limit(1);
  if (!row) {
    return res.status(404).json({ error: 'Not found' });
  }
  if (row.resumePath) {
    const abs = absoluteResumePath(row.resumePath);
    try {
      fs.unlinkSync(abs);
    } catch {
      /* ignore */
    }
  }
  await db.delete(messages).where(eq(messages.id, id));
  res.json({ ok: true });
});
