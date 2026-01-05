import { useEffect, useRef, useState } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-32 px-6 md:px-12 lg:px-24 bg-card transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column */}
          <div className={`space-y-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <span className="inline-block px-4 py-2 border border-border text-sm font-body tracking-widest text-muted-foreground uppercase">
              About Us
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-extrabold leading-[0.95]">
              WE'RE NOT YOUR
              <br />
              <span className="text-gradient">AVERAGE AGENCY</span>
            </h2>
          </div>

          {/* Right column */}
          <div className={`space-y-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-display">
              We're a collective of strategists, creators, and performance obsessives who believe 
              social media should do more than just exist—it should dominate.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Founded in the chaos of algorithm changes and attention wars, we've learned one thing: 
              the brands that win are the ones willing to break rules, take risks, and show up 
              relentlessly. We're here to make sure you're one of them.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              No fluffy reports. No vanity metrics. Just real results that impact your bottom line.
            </p>

            {/* Values */}
            <div className="grid grid-cols-2 gap-8 pt-8">
              {[
                { value: 'Bold', desc: 'We don\'t do safe' },
                { value: 'Data-Driven', desc: 'Every move is measured' },
                { value: 'Relentless', desc: 'We never stop optimizing' },
                { value: 'Authentic', desc: 'Real voices, real impact' },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className={`space-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <div className="text-xl font-display font-bold text-primary">{item.value}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
