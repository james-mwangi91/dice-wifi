import { WHY_CHOOSE_US } from '../../constants';
import SectionHeading from '../ui/SectionHeading';
import Button from '../ui/Button';
import { Stagger, StaggerItem } from '../ui/Reveal';

/** Why DICE — editorial numbered list on a dark band */
export default function WhyChooseUs() {
  return (
    <section id="why-us" className="relative bg-brand-dark py-24 text-white lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              dark
              eyebrow="Why DICE"
              title={
                <>
                  Built for how Kenya <span className="text-gradient">actually</span> uses the internet.
                </>
              }
              subtitle="Evening streaming, all-day Zoom, ranked matches and M-Pesa tills. Our network is sized for the busiest hour, not the average one."
            />
            <div className="mt-9">
              <Button to="/about" variant="glass">
                How we build our network
              </Button>
            </div>
          </div>
        </div>

        <Stagger className="grid gap-px overflow-hidden rounded-[1.75rem] bg-white/10 sm:grid-cols-2 lg:col-span-7" gap={0.05}>
          {WHY_CHOOSE_US.map((feature, i) => (
            <StaggerItem key={feature.title} className="h-full">
              <div className="group h-full bg-brand-dark p-7 transition-colors duration-300 hover:bg-[#121B16]">
                <div className="flex items-center justify-between">
                  <feature.icon className="h-6 w-6 text-brand-lime" />
                  <span className="font-display text-sm font-bold text-white/25">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
