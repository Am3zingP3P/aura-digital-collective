import { useRef, useEffect } from 'react';

const clients = [
  'NIKE', 'SPOTIFY', 'AIRBNB', 'TESLA', 'NETFLIX', 
  'AMAZON', 'APPLE', 'GOOGLE', 'META', 'UBER',
  'STRIPE', 'DISCORD'
];

const HorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);
      const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
      
      const scrollWidth = scroller.scrollWidth - window.innerWidth;
      scroller.style.transform = `translateX(-${clampedProgress * scrollWidth}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[300vh] bg-secondary"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Section header */}
        <div className="px-6 md:px-12 lg:px-24 mb-12">
          <span className="inline-block px-4 py-2 border border-border text-sm font-body tracking-widest text-muted-foreground uppercase">
            Trusted By Industry Leaders
          </span>
        </div>

        {/* Horizontal scroller */}
        <div 
          ref={scrollerRef}
          className="flex items-center gap-16 md:gap-24 px-6 md:px-12 lg:px-24 will-change-transform"
        >
          {clients.map((client, i) => (
            <div 
              key={i}
              className="flex-shrink-0 group"
            >
              <span className="text-6xl md:text-8xl lg:text-9xl font-display font-extrabold text-muted-foreground/20 group-hover:text-primary transition-colors duration-500 whitespace-nowrap">
                {client}
              </span>
            </div>
          ))}
        </div>

        {/* Instruction */}
        <div className="px-6 md:px-12 lg:px-24 mt-12 flex items-center gap-4 text-muted-foreground">
          <div className="w-12 h-px bg-border" />
          <span className="text-sm uppercase tracking-widest">Keep scrolling</span>
          <div className="w-12 h-px bg-border" />
        </div>
      </div>
    </section>
  );
};

export default HorizontalScroll;
