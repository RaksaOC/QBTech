import { servicesData } from '@/data/home';

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background border-y border-border/70">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center animate-fade-in">
          <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            What We Do
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Services
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service, index) => (
            <div
              key={service.title}
              className="group rounded-lg border border-border/60 bg-card p-8 transition-all hover:border-primary/30 hover:shadow-glow-sm animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <service.icon className="mb-4 h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{service.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
