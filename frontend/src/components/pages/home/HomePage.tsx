import Hero from './components/Hero';
import Services from './components/Services';
import WhyChoose from './components/WhyChoose';
import StatsSection from './components/StatsSection';
import ContactSection from './components/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyChoose />
      <StatsSection />
      <ContactSection />
    </>
  );
}
