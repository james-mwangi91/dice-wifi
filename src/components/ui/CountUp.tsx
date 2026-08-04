import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface CountUpNumberProps {
  end: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

/** Number that counts up when scrolled into view */
export default function CountUpNumber({
  end,
  decimals = 0,
  suffix = '',
  prefix = '',
  duration = 2.2,
  className,
}: CountUpNumberProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp start={0} end={end} decimals={decimals} suffix={suffix} prefix={prefix} duration={duration} enableScrollSpy={false} />
      ) : (
        <span>
          {prefix}0{suffix}
        </span>
      )}
    </span>
  );
}
