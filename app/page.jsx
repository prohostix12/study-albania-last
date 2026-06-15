import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WhyAlbania from '../components/WhyAlbania';
import MovingBanner from '../components/MovingBanner';
import CinematicSection from '../components/CinematicSection';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <WhyAlbania />
      <MovingBanner />
      <CinematicSection />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
