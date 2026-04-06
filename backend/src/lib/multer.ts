import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import multer from 'multer';

const uploadRoot = path.join(process.cwd(), 'uploads', 'resumes');
fs.mkdirSync(uploadRoot, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadRoot);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.bin';
    cb(null, `${randomUUID()}${ext}`);
  },
});

export const resumeUpload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ok = /\.(pdf|doc|docx)$/i.test(file.originalname);
    if (!ok) {
      cb(new Error('Only PDF, DOC, or DOCX files are allowed'));
      return;
    }
    cb(null, true);
  },
});

export function resumeRelativePath(filename: string) {
  return path.join('resumes', filename);
}

export function absoluteResumePath(relativePath: string) {
  return path.join(process.cwd(), 'uploads', relativePath);
}
