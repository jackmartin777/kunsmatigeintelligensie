import { useInView } from '../hooks/useInView';
import { useCounter } from '../hooks/useCounter';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  duration?: number;
}

export function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  label,
  sublabel,
  duration = 2000,
}: AnimatedCounterProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const count = useCounter(target, duration, isInView);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold gradient-text tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <div className="mt-2 text-sm font-semibold text-white/90 uppercase tracking-widest">
        {label}
      </div>
      {sublabel && (
        <div className="mt-0.5 text-xs text-white/50">{sublabel}</div>
      )}
    </div>
  );
}
