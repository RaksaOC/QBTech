import { Code, Cpu, Zap, Rocket, Users, CheckCircle, Lightbulb, Headphones, Award } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const heroData = {
  eyebrow: 'Quantum Bridge Tech Solution',
  titleLead: "Bridging Today's Vision",
  titleAccent: "to Tomorrow's Technology",
  description:
    "We architect cutting-edge software solutions that propel businesses into the future. From AI-driven platforms to cloud infrastructure — we build what's next.",
  primaryCta: { label: 'Explore Services', href: '#services' },
  secondaryCta: { label: 'Learn More', href: '/about' },
};

export type ServiceItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const servicesData: ServiceItem[] = [
  {
    icon: Code,
    title: 'Custom Software',
    description:
      'Full-stack application development from concept to deployment and beyond.',
  },
  {
    icon: Cpu,
    title: 'AI & Automation',
    description:
      'Custom AI models and intelligent automation solutions tailored to your business needs.',
  },
  {
    icon: Zap,
    title: 'Digital Transformation',
    description:
      'Strategic consulting to modernize legacy systems and accelerate innovation.',
  },
];

export type WhyReason = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const whyChooseData = {
  eyebrow: 'Why Us',
  title: 'Why Choose QB Tech',
  subtitle:
    "We don't just build software — we engineer competitive advantages that transform businesses.",
  reasons: [
    {
      icon: Rocket,
      title: 'Cutting-Edge Innovation',
      description:
        'We leverage the latest technologies including AI, blockchain, and quantum computing to keep you ahead of the curve.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description:
        'Our engineers and strategists bring decades of combined experience from top-tier tech companies worldwide.',
    },
    {
      icon: CheckCircle,
      title: 'Proven Track Record',
      description:
        '150+ successful projects delivered with a 99.9% client satisfaction rate across diverse industries.',
    },
    {
      icon: Lightbulb,
      title: 'Tailored Solutions',
      description:
        'No cookie-cutter approaches. Every solution is custom-engineered to fit your unique business challenges.',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description:
        'Round-the-clock technical support and proactive monitoring to ensure your systems never skip a beat.',
    },
    {
      icon: Award,
      title: 'Industry Certified',
      description:
        'ISO 27001, AWS Advanced Partner, and Google Cloud certified — your trust is backed by credentials.',
    },
  ] satisfies WhyReason[],
};

export const statsSectionData = {
  eyebrow: 'Who We Are',
  title: 'Engineering the Future',
  paragraphs: [
    'Quantum Bridge Tech Solution is a forward-thinking technology company specializing in enterprise software development, AI integration, and cloud-native architecture.',
    "Our team of engineers, architects, and strategists work at the intersection of innovation and reliability — delivering solutions that don't just work today, but scale for tomorrow.",
  ],
  stats: [
    { value: '150+', label: 'Projects Delivered' },
    { value: '50+', label: 'Global Clients' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '24/7', label: 'Support' },
  ],
};

export const contactSectionData = {
  eyebrow: 'Get In Touch',
  title: 'Ready to Build the Future?',
  description: "Let's discuss how QB Tech can accelerate your next project.",
  submitLabel: 'Send Message',
  fields: {
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'Your Email',
    messagePlaceholder: 'Tell us about your project...',
  },
};
