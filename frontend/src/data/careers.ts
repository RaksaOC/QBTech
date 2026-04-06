export const careersHero = {
  eyebrow: 'Careers',
  title: 'Join Us',
  description:
    "Be part of a team that's building the future. At QB Tech, you'll work on meaningful projects with brilliant people — and grow your career in ways you never imagined.",
};

export const benefitsData = [
  {
    title: 'Flexible Work',
    description: 'Remote-first culture with flexible hours',
  },
  {
    title: 'Growth',
    description: 'Learning budget, mentorship, and career paths',
  },
  {
    title: 'Impact',
    description: 'Work on projects that shape industries',
  },
] as const;

export const openPositionsSection = {
  eyebrow: 'Opportunities',
  title: 'Open Positions',
};

export type JobOpening = {
  title: string;
  description: string;
  department: string;
  type: string;
  location: string;
};

export const jobOpenings: JobOpening[] = [
  {
    title: 'DevOps Engineer',
    description:
      'Design and build scalable backend systems and APIs powering our enterprise platforms.',
    department: 'Engineering',
    type: 'Full-Time',
    location: 'Remote / On-site',
  },
  {
    title: 'Mobile Developer',
    description:
      'Create responsive, high-performance web applications using modern frontend frameworks.',
    department: 'Engineering',
    type: 'Full-Time',
    location: 'Remote / On-site',
  },
  {
    title: 'Frontend Developer',
    description:
      'Develop and deploy modern, responsive frontend interfaces using React and TypeScript.',
    department: 'Engineering',
    type: 'Full-Time',
    location: 'Remote',
  },
  {
    title: 'Backend Developer',
    description: 'Craft robust server-side applications, APIs, and database architectures.',
    department: 'Engineering',
    type: 'Full-Time',
    location: 'Remote / On-site',
  },
  {
    title: 'Full-Stack Developer',
    description:
      'Build end-to-end web applications spanning frontend, backend, and cloud infrastructure.',
    department: 'Engineering',
    type: 'Full-Time',
    location: 'Remote',
  },
];

export const careersDontSeeRole = {
  title: "Don't See Your Role?",
  description:
    "We're always looking for exceptional talent. Send us your resume and tell us how you can contribute.",
  buttonLabel: 'Get In Touch',
  buttonTo: '/#contact',
};
