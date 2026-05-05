import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import Placement from '../../components/Placement';
import Testimonials from '../../components/Testimonials';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';

export default function PlacementsPage() {
  return (
    <main>
      <Navbar />
      <PageHeader 
        title="Career & Placements"
        subtitle="Global opportunities await. Our students are placed in top international companies across Europe and the globe."
        breadcrumb="Placements"
      />
      <div style={{ backgroundColor: '#ffffff' }}>
        <Placement />
      </div>
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}
