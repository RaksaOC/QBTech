import { Outlet, ScrollRestoration } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
