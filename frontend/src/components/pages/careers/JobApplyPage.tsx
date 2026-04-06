import { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { fetchJob } from '@/api/jobs';
import { submitMessage } from '@/api/messages';
import type { Job } from '@/api/types';
import ResumeUpload from '@/components/common/ResumeUpload';

function JobSkeleton() {
  return (
    <div className="animate-pulse space-y-6 pt-28">
      <div className="h-8 w-48 rounded bg-muted" />
      <div className="h-4 w-full max-w-xl rounded bg-muted" />
      <div className="h-40 w-full max-w-lg rounded bg-muted" />
    </div>
  );
}

export default function JobApplyPage() {
  const { jobId: jobIdParam } = useParams();
  const jobId = Number(jobIdParam);
  const [job, setJob] = useState<Job | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingJob, setLoadingJob] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!Number.isFinite(jobId)) {
      setLoadError('Invalid job link.');
      setLoadingJob(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const j = await fetchJob(jobId);
        if (!cancelled) {
          setJob(j);
        }
      } catch {
        if (!cancelled) {
          setLoadError('This job is no longer available.');
        }
      } finally {
        if (!cancelled) {
          setLoadingJob(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [jobId]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!job) {
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitMessage({
        email,
        name: name || undefined,
        message,
        jobId: job.id,
        resume,
      });
      setDone(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  if (!Number.isFinite(jobId)) {
    return (
      <div className="container mx-auto px-4 pt-28 pb-24">
        <p className="font-body text-muted-foreground">Invalid job.</p>
        <Link to="/careers" className="mt-4 inline-block text-primary hover:underline">
          Back to careers
        </Link>
      </div>
    );
  }

  if (loadingJob) {
    return (
      <div className="container mx-auto px-4 pb-24">
        <JobSkeleton />
      </div>
    );
  }

  if (loadError || !job) {
    return (
      <div className="container mx-auto px-4 pt-28 pb-24">
        <p className="font-body text-muted-foreground">{loadError ?? 'Not found.'}</p>
        <Link to="/careers" className="mt-4 inline-block text-primary hover:underline">
          Back to careers
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="container mx-auto max-w-2xl px-4 pt-28 pb-24 text-center">
        <h1 className="mb-4 font-display text-3xl font-bold text-foreground">Application sent</h1>
        <p className="mb-8 font-body text-muted-foreground">
          Thanks for applying for <span className="text-foreground">{job.name}</span>. We will review your submission and get back to you.
        </p>
        <Link to="/careers" className="gradient-btn inline-block rounded-sm px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground">
          Back to careers
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 pb-24 pt-28">
      <Link
        to="/careers"
        className="mb-8 inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Careers
      </Link>

      <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">Apply</p>
      <h1 className="mb-2 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{job.name}</h1>
      <p className="mb-2 font-body text-sm text-muted-foreground">
        {job.department} · {job.timeType}
        {job.location ? ` · ${job.location}` : ''}
      </p>
      <p className="mb-10 font-body text-muted-foreground">{job.description}</p>

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-sm border border-input bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-sm border border-input bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <textarea
          rows={5}
          placeholder="Cover letter or message *"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="resize-none rounded-sm border border-input bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <ResumeUpload value={resume} onChange={setResume} disabled={submitting} />
        {submitError && <p className="font-body text-sm text-destructive">{submitError}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="gradient-btn inline-flex items-center justify-center gap-2 rounded-sm px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-shadow hover:shadow-glow disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          Submit application
        </button>
      </form>
    </div>
  );
}
