import Navbar from '../../components/Navbar';
import PageHeader from '../../components/PageHeader';
import LivingCost from '../../components/LivingCost';
import CTABanner from '../../components/CTABanner';
import Footer from '../../components/Footer';

export default function LivingCostsPage() {
  return (
    <main>
      <Navbar />
      <PageHeader 
        title="Living Costs in Albania"
        subtitle="Enjoy a high quality of life at a fraction of the cost. Albania is one of the most affordable study destinations in Europe."
        breadcrumb="Living Cost"
      />
      <LivingCost />
      <CTABanner />
      <Footer />
    </main>
  );
}
