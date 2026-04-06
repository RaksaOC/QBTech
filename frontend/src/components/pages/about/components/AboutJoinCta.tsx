import { Link } from 'react-router-dom';
import { aboutJoinCta } from '@/data/aboutPage';

export default function AboutJoinCta() {
  return (
    <section className="border-t border-border/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-in">
          <h2 className="mb-4 font-display text-3xl font-bold text-foreground">{aboutJoinCta.title}</h2>
          <p className="mb-8 font-body text-base text-muted-foreground">{aboutJoinCta.description}</p>
          <Link
            to={aboutJoinCta.buttonTo}
            className="gradient-btn inline-block rounded-sm px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-shadow hover:shadow-glow"
          >
            {aboutJoinCta.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
