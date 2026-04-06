import { Router } from 'express';
import { desc, eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { jobs, messages } from '../db/schema.js';
import { resumeRelativePath, resumeUpload } from '../lib/multer.js';

export const publicRouter = Router();

publicRouter.get('/jobs', async (_req, res) => {
  const rows = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
  res.json(rows);
});

publicRouter.get('/jobs/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isFinite(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }
  const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

publicRouter.post(
  '/messages',
  resumeUpload.single('resume'),
  async (req, res) => {
    try {
      const email = typeof req.body?.email === 'string' ? req.body.email.trim() : '';
      const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
      const body = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
      const jobIdRaw = req.body?.jobId;
      const jobId =
        jobIdRaw === undefined || jobIdRaw === '' || jobIdRaw === null
          ? null
          : Number(jobIdRaw);

      if (!email || !body) {
        return res.status(400).json({ error: 'Email and message are required' });
      }
      if (jobId !== null && !Number.isFinite(jobId)) {
        return res.status(400).json({ error: 'Invalid jobId' });
      }
      if (jobId !== null) {
        const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
        if (!job) {
          return res.status(400).json({ error: 'Job not found' });
        }
      }

      let resumePath: string | null = null;
      if (req.file) {
        resumePath = resumeRelativePath(req.file.filename);
      }

      const [row] = await db
        .insert(messages)
        .values({
          email,
          name: name || null,
          body,
          jobId,
          resumePath,
        })
        .returning();

      res.status(201).json(row);
    } catch (e) {
      if (e instanceof Error && e.message.includes('Only PDF')) {
        return res.status(400).json({ error: e.message });
      }
      throw e;
    }
  }
);
