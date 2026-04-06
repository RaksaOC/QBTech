import { Eye, Target, Star, Sparkles, Users, ShieldCheck, Heart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const aboutPageHero = {
  eyebrow: 'About Us',
  title: 'Who We Are',
  description:
    'Quantum Bridge Tech Solution (QB Tech) is a forward-thinking technology company founded on the belief that the right technology can bridge the gap between ambition and achievement. We partner with businesses of all sizes to deliver transformative software solutions, AI-powered platforms, and enterprise-grade cloud infrastructure.',
};

export const visionMissionData = [
  {
    icon: Eye,
    title: 'Our Vision',
    body:
      "To become the most trusted technology partner in the world — bridging the gap between today's challenges and tomorrow's possibilities through innovation, integrity, and relentless pursuit of excellence.",
  },
  {
    icon: Target,
    title: 'Our Mission',
    body:
      'To empower organizations with cutting-edge technology solutions that accelerate growth, optimize operations, and unlock new opportunities. We are committed to delivering measurable results through custom software, AI integration, and scalable cloud architecture.',
  },
] as const;

export type CoreValueItem = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const coreValuesSection = {
  eyebrow: 'What Drives Us',
  title: 'Core Values',
  values: [
    {
      icon: Star,
      title: 'Excellence',
      description:
        'We pursue the highest standards in every line of code and every client interaction.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description:
        'We embrace emerging technologies and creative problem-solving to stay ahead.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description:
        'Great solutions are built together — with our clients, partners, and each other.',
    },
    {
      icon: ShieldCheck,
      title: 'Integrity',
      description:
        'Transparency, honesty, and ethical practices guide every decision we make.',
    },
    {
      icon: Heart,
      title: 'Impact',
      description:
        'We measure success by the tangible value we create for businesses and communities.',
    },
  ] satisfies CoreValueItem[],
};

export const aboutJoinCta = {
  title: 'Want to Join Our Team?',
  description: "We're always looking for talented people who share our passion for innovation.",
  buttonLabel: 'View Open Positions',
  buttonTo: '/careers',
};
