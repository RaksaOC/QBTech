import { statsSectionData } from '@/data/home';

export default function StatsSection() {
  return (
    <section id="stats" className="border-y border-border/70 py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="animate-fade-in">
            <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              {statsSectionData.eyebrow}
            </p>
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {statsSectionData.title}
            </h2>
            {statsSectionData.paragraphs.map((p, i) => (
              <p key={i} className="mb-4 last:mb-0 font-body text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {statsSectionData.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border/60 bg-card p-6 text-center"
              >
                <p className="font-display text-3xl font-bold text-glow text-primary">{stat.value}</p>
                <p className="mt-1 font-body text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
