import { whyChooseData } from '@/data/home';

export default function WhyChoose() {
  return (
    <section id="why-choose" className="border-t border-border/70 py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center animate-fade-in">
          <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {whyChooseData.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {whyChooseData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-body text-base text-muted-foreground">
            {whyChooseData.subtitle}
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyChooseData.reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="flex gap-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                <reason.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-display text-base font-semibold text-foreground">{reason.title}</h3>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
