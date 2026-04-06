import { Link } from 'react-router-dom';
import { siteBrand } from '@/data/site';

export default function Footer() {
  return (
    <footer className="border-t border-border/70 py-10 bg-background">
      <div className="container mx-auto px-4 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <Link to="/" className="font-display text-lg font-bold tracking-wider text-primary">
          {siteBrand.nameShort}
          <span className="text-foreground">{siteBrand.nameRest}</span>
        </Link>
        <p className="font-body text-xs text-muted-foreground">
          © {siteBrand.copyrightYear} {siteBrand.companyLegal}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
