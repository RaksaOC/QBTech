import { Link } from 'react-router-dom';
import { heroData } from '@/data/home';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src="/bg.jpg"
          alt="Technology visualization"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      <div className="container mx-auto px-4 relative z-10 py-32">
        <div className="max-w-3xl animate-fade-in">
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {heroData.eyebrow}
          </p>
          <h1 className="mb-6 font-display text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {heroData.titleLead}{' '}
            <span className="text-glow text-primary">{heroData.titleAccent}</span>
          </h1>
          <p className="mb-10 max-w-xl font-body text-lg leading-relaxed text-muted-foreground">
            {heroData.description}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={heroData.primaryCta.href}
              className="gradient-btn rounded-sm px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-shadow hover:shadow-glow"
            >
              {heroData.primaryCta.label}
            </a>
            <Link
              to={heroData.secondaryCta.href}
              className="rounded-sm border border-primary/30 px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary transition-all hover:border-primary hover:bg-primary/5"
            >
              {heroData.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
