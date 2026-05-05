interface MarqueeTickerProps {
  items: string[];
  speed?: 'normal' | 'slow';
  className?: string;
}

export function MarqueeTicker({ items, speed = 'normal', className = '' }: MarqueeTickerProps) {
  const animClass = speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee';
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div className={`flex whitespace-nowrap ${animClass} pause-on-hover`}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 mx-6">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />
            <span className="text-sm font-medium text-purple-200 tracking-wide uppercase">
              {item}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
