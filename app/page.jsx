import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import WhyAlbania from '../components/WhyAlbania';
import MovingBanner from '../components/MovingBanner';
import CinematicSection from '../components/CinematicSection';
import UniversitiesHome from '../components/UniversitiesHome';
import Placement from '../components/Placement';
import LivingCost from '../components/LivingCost';
import StatsBar from '../components/StatsBar';
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
      <UniversitiesHome />
      <Placement />
      <LivingCost />
      <StatsBar />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Footer />
    </main>
  );
}
