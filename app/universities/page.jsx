import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import Universities from '../../components/Universities';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';

export default function UniversitiesPage() {
  return (
    <main>
      <Navbar />
      <PageHeader 
        title="Top Universities in Albania"
        subtitle="Explore world-class education with EU-standard degrees, English-taught programs, and affordable tuition fees."
        breadcrumb="Universities"
      />
      <Universities />
      <CTABanner />
      <Footer />
    </main>
  );
}
