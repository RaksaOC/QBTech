import { visionMissionData } from '@/data/aboutPage';

export default function VisionMission() {
  return (
    <section className="border-t border-border/50 py-24">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2">
          {visionMissionData.map((block) => (
            <div
              key={block.title}
              className="rounded-lg border border-border/50 bg-card p-10 animate-fade-in"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg border border-primary/20 bg-primary/5">
                <block.icon className="h-7 w-7 text-primary" />
              </div>
              <h2 className="mb-4 font-display text-2xl font-bold text-foreground">{block.title}</h2>
              <p className="font-body text-base leading-relaxed text-muted-foreground">{block.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
