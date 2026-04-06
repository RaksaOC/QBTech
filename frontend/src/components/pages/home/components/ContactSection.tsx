import { FormEvent, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { contactSectionData } from '@/data/home';
import { submitMessage } from '@/api/messages';
import ResumeUpload from '@/components/common/ResumeUpload';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);
    try {
      await submitMessage({
        email: formData.email,
        name: formData.name || undefined,
        message: formData.message,
        resume,
      });
      setFeedback({ type: 'ok', text: 'Thanks — your message was sent.' });
      setFormData({ name: '', email: '', message: '' });
      setResume(null);
    } catch (err) {
      setFeedback({
        type: 'err',
        text: err instanceof Error ? err.message : 'Could not send. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const f = contactSectionData.fields;

  return (
    <section id="contact" className="border-t border-border/70 py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center animate-fade-in">
          <p className="mb-2 font-display text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            {contactSectionData.eyebrow}
          </p>
          <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {contactSectionData.title}
          </h2>
          <p className="mb-10 font-body text-base text-muted-foreground">
            {contactSectionData.description}
          </p>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-4 text-left">
            <input
              type="text"
              placeholder={f.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="rounded-sm border border-input bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="email"
              placeholder={f.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="rounded-sm border border-input bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
            <textarea
              rows={4}
              placeholder={f.messagePlaceholder}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="resize-none rounded-sm border border-input bg-card px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
            <ResumeUpload value={resume} onChange={setResume} disabled={submitting} />
            {feedback && (
              <p
                className={
                  feedback.type === 'ok' ? 'font-body text-sm text-primary' : 'font-body text-sm text-destructive'
                }
              >
                {feedback.text}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="gradient-btn inline-flex items-center justify-center gap-2 rounded-sm px-8 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-shadow hover:shadow-glow disabled:opacity-60"
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {contactSectionData.submitLabel}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
