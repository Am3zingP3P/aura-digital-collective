import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between items-center px-4 md:px-12 lg:px-24 py-6 overflow-hidden text-center">
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

      {/* Floating accent - Háttérfény */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] md:w-[40rem] md:h-[40rem] bg-primary/10 rounded-full blur-[100px] animate-float pointer-events-none" />
      
      {/* Felső tartalom (Cím és Gombok) */}
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-7xl mx-auto z-10 gap-6 md:gap-8 pb-8">
        
        {/* Tag - ITT A JAVÍTÁS: mt-12 hozzáadva, hogy lejjebb kerüljön */}
        <div className="opacity-0 animate-slide-up stagger-1 mt-12">
          <span className="inline-block px-3 py-1.5 border border-white/10 text-xs md:text-sm font-body tracking-widest text-muted-foreground uppercase bg-white/5 backdrop-blur-md rounded-full shadow-sm">
            Social Media Agency
          </span>
        </div>

        {/* Main headline */}
        <h1 className="opacity-0 animate-slide-up stagger-2">
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-display font-extrabold leading-[0.9] tracking-tight text-foreground/90">
            WE MAKE
          </span>
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-display font-extrabold leading-[0.9] tracking-tight text-white drop-shadow-md">
            BRANDS
          </span>
          {/* THRIVE - Neon Zöld & Glow */}
          <span className="block text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[8rem] font-display font-extrabold leading-[0.85] tracking-tight text-primary drop-shadow-[0_0_35px_rgba(var(--primary-rgb),0.6)]">
            THRIVE
          </span>
        </h1>

        {/* Subtitle */}
        <p className="opacity-0 animate-slide-up stagger-3 max-w-2xl mx-auto text-base md:text-lg text-muted-foreground font-body leading-relaxed px-4">
          We craft scroll-stopping content that turns followers into fanatics. 
          Strategy, creativity, and performance—all in one ruthless package.
        </p>

        {/* CTA Buttons */}
        <div className="opacity-0 animate-slide-up stagger-4 flex flex-wrap justify-center gap-4 pt-2">
          <Button variant="primary" size="lg" className="h-12 px-8 text-base shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)] hover:shadow-[0_0_35px_rgba(var(--primary-rgb),0.6)] transition-all duration-300">
            Start Your Takeover
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 text-base backdrop-blur-sm bg-white/5 border-white/10 hover:bg-white/10 text-white">
            View Our Work
          </Button>
        </div>
      </div>

      {/* Stats row - "Silver Glass" Lebegő Sziget */}
      <div className="opacity-0 animate-slide-up stagger-5 w-full max-w-5xl mx-auto z-10 mb-4 md:mb-8 px-2">
        <div className="bg-gradient-to-b from-white/10 via-white/5 to-transparent backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)] p-6 md:p-8 relative overflow-hidden group">
          
          {/* Felső fényes él (Highlight) */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70" />
          
          {/* Ezüstös derengés */}
          <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-overlay" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
            {[
              { value: '500M+', label: 'Impressions' },
              { value: '200+', label: 'Brands' },
              { value: '12x', label: 'Avg ROI' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1 text-center relative">
                {/* Elválasztó vonal desktopon */}
                {i !== 0 && (
                  <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-12 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                )}
                
                <div className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.3)]">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-zinc-400 uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;