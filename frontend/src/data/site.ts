export const siteBrand = {
  nameShort: 'QB',
  nameRest: ' TECH',
  companyLegal: 'Quantum Bridge Tech Solution',
  copyrightYear: 2026,
} as const;

export type NavItem = {
  label: string;
  to: string;
};

/** Hash routes point to sections on the home page */
export const mainNav: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/#services' },
  { label: 'About', to: '/about' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact', to: '/#contact' },
];
