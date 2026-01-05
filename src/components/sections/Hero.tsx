import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center px-4 md:px-12 lg:px-24 py-12 overflow-hidden text-center">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] bg-primary/10 rounded-full blur-[100px] animate-float pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-between h-full gap-8 md:gap-12">
        
        {/* Fő tartalom blokk */}
        <div className="space-y-6 md:space-y-8 w-full flex-1 flex flex-col justify-center">
          {/* Tag */}
          <div className="opacity-0 animate-slide-up stagger-1 flex justify-center">
            <span className="inline-block px-3 py-1.5 border border-border/50 text-xs md:text-sm font-body tracking-widest text-muted-foreground uppercase bg-background/50 backdrop-blur-md rounded-full">
              Social Media Agency
            </span>
          </div>

          {/* Main headline - "THRIVE" csere és igazítás */}
          <h1 className="opacity-0 animate-slide-up stagger-2">
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-display font-extrabold leading-[0.9] tracking-tight">
              WE MAKE
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-display font-extrabold leading-[0.9] tracking-tight text-gradient py-2">
              BRANDS
            </span>
            {/* A "THRIVE" rövidebb, így jobban mutat, ha kicsit nagyobbat üt */}
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[8rem] font-display font-extrabold leading-[0.9] tracking-tight">
              THRIVE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="opacity-0 animate-slide-up stagger-3 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground font-body leading-relaxed px-4">
            We craft scroll-stopping content that turns followers into fanatics. 
            Strategy, creativity, and performance—all in one ruthless package.
          </p>

          {/* CTA */}
          <div className="opacity-0 animate-slide-up stagger-4 flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="lg" className="h-12 px-8 text-base shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-shadow">
              Start Your Takeover
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base backdrop-blur-sm bg-background/50">
              View Our Work
            </Button>
          </div>
        </div>

        {/* Stats row - Erősebb "Glass" hatás */}
        {/* backdrop-blur-xl: sokkal erősebb homályosítás */}
        {/* border-white/10: finom, elegáns keret */}
        {/* shadow-2xl: mélységérzet */}
        <div className="opacity-0 animate-slide-up stagger-5 w-full border-t border-x border-white/10 bg-background/60 backdrop-blur-2xl rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)] pt-8 pb-6 md:pb-8 relative overflow-hidden">
          
          {/* Opcionális: fényes becsillanás a tetején (glass highlight) */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto relative z-10">
            {[
              { value: '500M+', label: 'Impressions' },
              { value: '200+', label: 'Brands' },
              { value: '12x', label: 'Avg ROI' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1 text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gradient drop-shadow-sm">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;