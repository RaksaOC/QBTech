import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Clock, MapPin } from 'lucide-react';
import { fetchJobs } from '@/api/jobs';
import type { Job } from '@/api/types';
import { openPositionsSection } from '@/data/careers';

function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-lg border border-border/50 bg-card p-6">
      <div className="mb-3 h-5 w-48 rounded bg-muted" />
      <div className="mb-3 h-4 w-full rounded bg-muted" />
      <div className="flex gap-4">
        <div className="h-3 w-20 rounded bg-muted" />
        <div className="h-3 w-16 rounded bg-muted" />
        <div className="h-3 w-24 rounded bg-muted" />
      </div>
    </div>
  );
}

export default function OpenPositions() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const rows = await fetchJobs();
        if (!cancelled) {
          setJobs(rows);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Could not load positions');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="border-t border-border/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center animate-fade-in">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {openPositionsSection.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {openPositionsSection.title}
          </h2>
        </div>

        {loading && (
          <div className="mx-auto max-w-3xl space-y-4">
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </div>
        )}

        {!loading && error && (
          <p className="mx-auto max-w-3xl text-center font-body text-sm text-destructive">{error}</p>
        )}

        {!loading && !error && (
          <div className="mx-auto max-w-3xl space-y-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                to={`/careers/apply/${job.id}`}
                className="group block rounded-lg border border-border/50 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-glow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="mb-1 font-display text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
                      {job.name}
                    </h3>
                    <p className="mb-3 font-body text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-primary/60" />
                        {job.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary/60" />
                        {job.timeType}
                      </span>
                      {job.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-primary/60" />
                          {job.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="hidden h-5 w-5 shrink-0 text-primary opacity-0 transition-opacity group-hover:opacity-100 sm:block" />
                </div>
              </Link>
            ))}
            {jobs.length === 0 && (
              <p className="text-center font-body text-muted-foreground">
                No open positions right now. Check back soon or send us a message.
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
