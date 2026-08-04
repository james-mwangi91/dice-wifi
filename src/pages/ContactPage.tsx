import PageHeader from '../components/ui/PageHeader';
import Contact from '../components/home/Contact';
import CTA from '../components/home/CTA';

/** Contact page */
export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={['Contact']}
        title={
          <>
            Talk to a <span className="text-gradient">real human</span>
          </>
        }
        subtitle="Call, WhatsApp, email or drop us a message — we respond within 30 minutes during business hours."
      />
      <Contact />
      <CTA />
    </>
  );
}
