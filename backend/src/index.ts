import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { authRouter } from './routes/auth.js';
import { publicRouter } from './routes/public.js';
import { adminRouter } from './routes/admin.js';

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(',') ?? true,
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api', publicRouter);
app.use('/api/admin', adminRouter);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use((err: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  void next;
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal error' });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
