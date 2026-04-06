import { aboutPageHero } from '@/data/aboutPage';

export default function AboutHero() {
  return (
    <section className="pb-16 pt-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center animate-fade-in">
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {aboutPageHero.eyebrow}
          </p>
          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {aboutPageHero.title}
          </h1>
          <p className="font-body text-lg leading-relaxed text-muted-foreground">{aboutPageHero.description}</p>
        </div>
      </div>
    </section>
  );
}
