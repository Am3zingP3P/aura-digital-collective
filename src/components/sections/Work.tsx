import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'NEON ATHLETICS',
    category: 'Brand Launch',
    metric: '+450% Engagement',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop',
  },
  {
    title: 'VOID COFFEE',
    category: 'Social Takeover',
    metric: '2M New Followers',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
  },
  {
    title: 'PULSE TECH',
    category: 'Viral Campaign',
    metric: '50M+ Views',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop',
  },
  {
    title: 'STORM FASHION',
    category: 'Influencer Strategy',
    metric: '12x ROAS',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
  },
];

const Work = () => {
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
      className={`py-32 px-6 md:px-12 lg:px-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div className="space-y-4">
            <span className="inline-block px-4 py-2 border border-border text-sm font-body tracking-widest text-muted-foreground uppercase">
              Selected Work
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[0.95]">
              RESULTS THAT
              <br />
              <span className="text-gradient">SPEAK</span>
            </h2>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-1">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`group border-t border-border last:border-b py-8 md:py-12 cursor-pointer hover:bg-secondary/30 transition-all duration-500 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-8">
                  <span className="text-sm text-muted-foreground font-mono">
                    0{i + 1}
                  </span>
                  <div className="w-24 h-16 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-display font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                <div className="flex items-center gap-8 md:gap-16">
                  <span className="text-muted-foreground uppercase tracking-wider text-sm">
                    {project.category}
                  </span>
                  <span className="text-gradient font-display font-bold text-lg">
                    {project.metric}
                  </span>
                  <ArrowUpRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
