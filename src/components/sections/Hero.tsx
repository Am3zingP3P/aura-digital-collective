import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    // Added pb-40 md:pb-56 to create more background space at the bottom
    <section className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 pt-24 pb-40 md:pb-56 overflow-hidden text-center">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[120px] animate-float pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center">
        <div className="space-y-8 w-full">
          {/* Tag */}
          <div className="opacity-0 animate-slide-up stagger-1 flex justify-center">
            <span className="inline-block px-4 py-2 border border-border text-sm font-body tracking-widest text-muted-foreground uppercase">
              Social Media Agency
            </span>
          </div>

          {/* Main headline */}
          <h1 className="opacity-0 animate-slide-up stagger-2">
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold leading-[0.95] tracking-tight">
              WE MAKE
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold leading-[0.95] tracking-tight text-gradient">
              BRANDS
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-extrabold leading-[0.95] tracking-tight text-gradient">
              THRIVE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="opacity-0 animate-slide-up stagger-3 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
            We craft scroll-stopping content that turns followers into fanatics. 
            Strategy, creativity, and performance—all in one ruthless package.
          </p>

          {/* CTA */}
          <div className="opacity-0 animate-slide-up stagger-4 flex flex-wrap justify-center gap-4 pt-4">
            <Button variant="primary" size="lg">
              Start Your Takeover
            </Button>
            <Button variant="outline" size="lg">
              View Our Work
            </Button>
          </div>
        </div>

        {/* Stats row */}
        <div className="opacity-0 animate-slide-up stagger-5 grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-border w-full">
          {[
            { value: '500M+', label: 'Impressions Generated' },
            { value: '200+', label: 'Brands Transformed' },
            { value: '12x', label: 'Average ROI' },
            { value: '24/7', label: 'Always On' },
          ].map((stat, i) => (
            <div key={i} className="space-y-2 text-center">
              <div className="text-3xl md:text-4xl font-display font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;