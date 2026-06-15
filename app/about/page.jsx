import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import Footer from '../../components/Footer';
import CTABanner from '../../components/CTABanner';
import AboutContent from './AboutContent';

export const metadata = {
  title: 'About Us | Study in Albania',
  description: 'Learn about Study Albania — our mission, team, and commitment to connecting international students with world-class education in Albania.',
};

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <PageHeader
        title="About Study Albania"
        subtitle="Your trusted gateway to affordable, EU-recognized education. We guide students from across the world to build their future in Albania."
        videoSrc="/videos/about-hero.mp4"
      />
      <AboutContent />
      <CTABanner />
      <Footer />
    </main>
  );
}
