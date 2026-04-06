import { careersHero } from '@/data/careers';

export default function CareersHero() {
  return (
    <section className="pb-16 pt-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {careersHero.eyebrow}
          </p>
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {careersHero.title}
          </h1>
          <p className="font-body text-lg leading-relaxed text-muted-foreground">{careersHero.description}</p>
        </div>
      </div>
    </section>
  );
}
