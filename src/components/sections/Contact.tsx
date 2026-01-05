import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const Contact = () => {
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
      className={`py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`text-center space-y-8 mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <span className="inline-block px-4 py-2 border border-border text-sm font-body tracking-widest text-muted-foreground uppercase">
            Let's Talk
          </span>
          <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-display font-extrabold leading-[0.9]">
            READY TO
            <br />
            <span className="text-gradient">DOMINATE?</span>
          </h2>
          <p className="max-w-xl mx-auto text-xl text-muted-foreground leading-relaxed">
            Drop us a line. We'll respond faster than your competitors can say "engagement rate."
          </p>
        </div>

        <div className={`flex justify-center transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Button variant="primary" size="xl" className="group">
            Start a Project
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Contact info */}
        <div className="mt-24 pt-12 border-t border-border grid md:grid-cols-3 gap-8 text-center">
          {[
            { label: 'Email', value: 'hello@socialdominance.co', href: 'mailto:hello@socialdominance.co' },
            { label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
            { label: 'Location', value: 'New York / Los Angeles / London', href: null },
          ].map((item, i) => (
            <div 
              key={i}
              className={`space-y-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
              style={{ transitionDelay: `${500 + i * 100}ms` }}
            >
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{item.label}</div>
              {item.href ? (
                <a href={item.href} className="text-lg font-display font-bold hover:text-primary transition-colors">
                  {item.value}
                </a>
              ) : (
                <div className="text-lg font-display font-bold">
                  {item.value}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
