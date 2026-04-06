import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { mainNav, siteBrand } from '@/data/site';

function navLinkClass(active: boolean) {
  return [
    'font-display text-sm font-medium uppercase tracking-widest transition-colors',
    active ? 'text-primary' : 'text-muted-foreground hover:text-primary',
  ].join(' ');
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link className="font-display text-lg font-bold tracking-wider text-primary" to="/">
          {siteBrand.nameShort}
          <span className="text-foreground">{siteBrand.nameRest}</span>
        </Link>

        <div className="hidden gap-8 md:flex">
          {mainNav.map((item) =>
            item.to.startsWith('/#') ? (
              <Link
                key={item.label}
                to={item.to}
                className="font-display text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <NavLink key={item.label} to={item.to} className={({ isActive }) => navLinkClass(isActive)} end={item.to === '/'}>
                {item.label}
              </NavLink>
            )
          )}
        </div>

        <Link
          to="/#contact"
          className="hidden gradient-btn rounded-sm px-5 py-2 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-shadow hover:shadow-glow md:inline-block"
        >
          Get Started
        </Link>

        <button
          className="text-foreground md:hidden"
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border/70 bg-card/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {mainNav.map((item) =>
              item.to.startsWith('/#') ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="font-body text-sm font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    ['font-body text-sm font-medium uppercase tracking-widest transition-colors', isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'].join(' ')
                  }
                  end={item.to === '/'}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              )
            )}
            <Link
              to="/#contact"
              className="gradient-btn rounded-sm px-5 py-2 font-display text-sm font-semibold uppercase tracking-wider text-primary-foreground text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
