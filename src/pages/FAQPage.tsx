import PageHeader from '../components/ui/PageHeader';
import FAQ from '../components/home/FAQ';
import CTA from '../components/home/CTA';

/** FAQ page */
export default function FAQPage() {
  return (
    <>
      <PageHeader
        crumbs={['FAQ']}
        title={
          <>
            Frequently asked <span className="text-gradient">questions</span>
          </>
        }
        subtitle="Straight answers, no jargon. If you can't find your question below, our team is one call away."
      />
      <FAQ />
      <CTA />
    </>
  );
}
