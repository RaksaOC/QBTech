import { Link } from 'react-router-dom';
import { careersDontSeeRole } from '@/data/careers';

export default function DontSeeRole() {
  return (
    <section className="border-t border-border/50 py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-in">
          <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{careersDontSeeRole.title}</h2>
          <p className="mb-8 font-body text-base text-muted-foreground">{careersDontSeeRole.description}</p>
          <Link
            to={careersDontSeeRole.buttonTo}
            className="gradient-btn inline-block rounded-sm px-8 py-3 font-body text-sm font-bold uppercase tracking-wider text-primary-foreground transition-shadow hover:shadow-glow"
          >
            {careersDontSeeRole.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
