import { coreValuesSection } from '@/data/aboutPage';

export default function CoreValuesGrid() {
  const { values } = coreValuesSection;
  return (
    <section className="border-t border-border/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center animate-fade-in">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {coreValuesSection.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {coreValuesSection.title}
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.slice(0, 3).map((v) => (
            <ValueCard key={v.title} item={v} />
          ))}
        </div>
        <div className="mt-6 flex flex-col items-stretch gap-6 sm:flex-row sm:flex-wrap sm:justify-center">
          {values.slice(3).map((v) => (
            <div key={v.title} className="w-full max-w-md sm:w-[calc(50%-0.75rem)] lg:max-w-md">
              <ValueCard item={v} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({
  item,
}: {
  item: (typeof coreValuesSection.values)[number];
}) {
  return (
    <div className="rounded-lg border border-border/50 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-glow-sm animate-fade-in">
      <item.icon className="mb-4 h-8 w-8 text-primary" />
      <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{item.title}</h3>
      <p className="font-body text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </div>
  );
}
