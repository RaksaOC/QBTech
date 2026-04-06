import { benefitsData } from '@/data/careers';

export default function BenefitsRow() {
  return (
    <section className="border-t border-border/50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
          {benefitsData.map((b) => (
            <div key={b.title} className="text-center">
              <h3 className="mb-1 font-display text-lg font-semibold text-primary">{b.title}</h3>
              <p className="font-body text-sm text-muted-foreground">{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
