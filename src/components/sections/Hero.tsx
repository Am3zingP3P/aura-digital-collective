import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    // "min-h-[100dvh]" használata a sima "min-h-screen" helyett jobb mobilon (címsor miatt)
    // A paddingokat csökkentettem (py-12), hogy függőlegesen középre tudjon rendeződni a tartalom anélkül, hogy kilógna
    <section className="relative min-h-[100dvh] flex flex-col justify-center items-center px-4 md:px-12 lg:px-24 py-12 overflow-hidden text-center">
      {/* Background grid - kiterjesztve */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating accent - finomítva a pozíció */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] bg-primary/10 rounded-full blur-[100px] animate-float pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center justify-between h-full gap-8 md:gap-12">
        
        {/* Fő tartalom blokk */}
        <div className="space-y-6 md:space-y-8 w-full flex-1 flex flex-col justify-center">
          {/* Tag */}
          <div className="opacity-0 animate-slide-up stagger-1 flex justify-center">
            <span className="inline-block px-3 py-1.5 border border-border text-xs md:text-sm font-body tracking-widest text-muted-foreground uppercase bg-background/50 backdrop-blur-sm">
              Social Media Agency
            </span>
          </div>

          {/* Main headline - Méretek optimalizálva, hogy elférjen */}
          {/* xl:text-8xl-re visszavéve a 9xl-ről a jobb kiférhetőségért */}
          <h1 className="opacity-0 animate-slide-up stagger-2">
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-display font-extrabold leading-[0.9] tracking-tight">
              WE MAKE
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-display font-extrabold leading-[0.9] tracking-tight text-gradient py-2">
              BRANDS
            </span>
            <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-display font-extrabold leading-[0.9] tracking-tight break-words">
              UNFORGETTABLE
            </span>
          </h1>

          {/* Subtitle - max-width növelve, margin csökkentve */}
          <p className="opacity-0 animate-slide-up stagger-3 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground font-body leading-relaxed px-4">
            We craft scroll-stopping content that turns followers into fanatics. 
            Strategy, creativity, and performance—all in one ruthless package.
          </p>

          {/* CTA - margin csökkentve */}
          <div className="opacity-0 animate-slide-up stagger-4 flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="lg" className="h-12 px-8 text-base">
              Start Your Takeover
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              View Our Work
            </Button>
          </div>
        </div>

        {/* Stats row - Közelebb húzva (mt helyett flex gap kezeli) */}
        {/* Ez most már a képernyő alján, de még láthatóan jelenik meg */}
        <div className="opacity-0 animate-slide-up stagger-5 w-full border-t border-border/50 pt-8 mt-4 md:mt-0 bg-background/30 backdrop-blur-sm rounded-t-2xl pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-5xl mx-auto">
            {[
              { value: '500M+', label: 'Impressions' },
              { value: '200+', label: 'Brands' },
              { value: '12x', label: 'Avg ROI' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1 text-center">
                <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gradient">{stat.value}</div>
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