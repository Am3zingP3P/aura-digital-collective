import { useState, useEffect, useRef } from 'react';
import { Megaphone, TrendingUp, Palette, BarChart3, Users, Zap } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const services = [
  {
    icon: Megaphone,
    title: 'Content Strategy',
    description: 'Data-driven content that captures attention and drives engagement across all platforms.',
    number: '01',
    content: {
      type: 'timeline',
      items: [
        { phase: 'Discovery', duration: 'Week 1', description: 'Deep dive into your brand, audience, and competitors' },
        { phase: 'Strategy', duration: 'Week 2', description: 'Develop content pillars, themes, and posting cadence' },
        { phase: 'Creation', duration: 'Week 3-4', description: 'Produce high-quality content across all formats' },
        { phase: 'Launch', duration: 'Week 5', description: 'Execute coordinated content rollout' },
        { phase: 'Optimize', duration: 'Ongoing', description: 'Analyze, iterate, and scale what works' },
      ]
    }
  },
  {
    icon: TrendingUp,
    title: 'Paid Social',
    description: 'Strategic ad campaigns that maximize ROI and scale your reach exponentially.',
    number: '02',
    content: {
      type: 'stats',
      items: [
        { label: 'Average ROAS', value: '4.2x', description: 'Return on ad spend' },
        { label: 'CTR Improvement', value: '+340%', description: 'Click-through rate boost' },
        { label: 'CPA Reduction', value: '-62%', description: 'Cost per acquisition' },
        { label: 'Reach Scaling', value: '10M+', description: 'Monthly impressions managed' },
      ]
    }
  },
  {
    icon: Palette,
    title: 'Creative Production',
    description: 'Scroll-stopping visuals and videos that make your brand impossible to ignore.',
    number: '03',
    content: {
      type: 'showcase',
      items: [
        { format: 'Short-Form Video', platforms: 'TikTok, Reels, Shorts' },
        { format: 'Static Graphics', platforms: 'Feed Posts, Stories' },
        { format: 'Motion Design', platforms: 'Ads, Branded Content' },
        { format: 'UGC Production', platforms: 'All Platforms' },
      ]
    }
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Real-time data analysis that turns metrics into actionable growth strategies.',
    number: '04',
    content: {
      type: 'metrics',
      items: [
        { metric: 'Engagement Rate', trend: 'up', change: '+156%' },
        { metric: 'Follower Growth', trend: 'up', change: '+89%' },
        { metric: 'Share of Voice', trend: 'up', change: '+234%' },
        { metric: 'Brand Sentiment', trend: 'up', change: '+67%' },
      ]
    }
  },
  {
    icon: Users,
    title: 'Community Management',
    description: 'Building loyal communities that advocate for your brand 24/7.',
    number: '05',
    content: {
      type: 'features',
      items: [
        { feature: 'Real-time Response', description: '< 30 min average response time' },
        { feature: 'Sentiment Analysis', description: 'AI-powered mood tracking' },
        { feature: 'Crisis Management', description: '24/7 monitoring & rapid response' },
        { feature: 'Ambassador Programs', description: 'Turn fans into advocates' },
      ]
    }
  },
  {
    icon: Zap,
    title: 'Influencer Partnerships',
    description: 'Strategic collaborations with creators who amplify your message authentically.',
    number: '06',
    content: {
      type: 'network',
      items: [
        { tier: 'Nano', range: '1K-10K', specialty: 'High engagement, niche audiences' },
        { tier: 'Micro', range: '10K-100K', specialty: 'Authentic reach, strong trust' },
        { tier: 'Macro', range: '100K-1M', specialty: 'Mass awareness, viral potential' },
        { tier: 'Mega', range: '1M+', specialty: 'Celebrity impact, global reach' },
      ]
    }
  },
];

const ServiceModal = ({ service, open, onClose }: { service: typeof services[0] | null; open: boolean; onClose: () => void }) => {
  if (!service) return null;

  const renderContent = () => {
    switch (service.content.type) {
      case 'timeline':
        return (
          <div className="relative pl-8 space-y-8 mt-8">
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />
            {service.content.items.map((item: any, i: number) => (
              <div key={i} className="relative">
                <div className="absolute -left-5 w-4 h-4 rounded-full bg-primary shadow-[0_0_20px_hsl(var(--primary))]" />
                <div className="bg-card/50 border border-border rounded-lg p-4 ml-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-primary font-display font-bold">{item.phase}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{item.duration}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
      case 'stats':
        return (
          <div className="grid grid-cols-2 gap-4 mt-8">
            {service.content.items.map((item: any, i: number) => (
              <div key={i} className="bg-card/50 border border-border rounded-lg p-6 text-center group hover:border-primary/50 transition-colors">
                <div className="text-3xl font-display font-bold text-gradient mb-1">{item.value}</div>
                <div className="text-sm font-semibold text-foreground">{item.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
              </div>
            ))}
          </div>
        );
      case 'showcase':
        return (
          <div className="space-y-4 mt-8">
            {service.content.items.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between bg-card/50 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <span className="font-semibold">{item.format}</span>
                <span className="text-sm text-muted-foreground">{item.platforms}</span>
              </div>
            ))}
          </div>
        );
      case 'metrics':
        return (
          <div className="space-y-4 mt-8">
            {service.content.items.map((item: any, i: number) => (
              <div key={i} className="bg-card/50 border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{item.metric}</span>
                  <span className="text-primary font-bold">{item.change}</span>
                </div>
                <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full transition-all duration-1000"
                    style={{ width: `${60 + i * 10}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );
      case 'features':
        return (
          <div className="grid grid-cols-1 gap-4 mt-8">
            {service.content.items.map((item: any, i: number) => (
              <div key={i} className="flex items-start gap-4 bg-card/50 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shadow-[0_0_10px_hsl(var(--primary))]" />
                <div>
                  <div className="font-semibold">{item.feature}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </div>
              </div>
            ))}
          </div>
        );
      case 'network':
        return (
          <div className="space-y-4 mt-8">
            {service.content.items.map((item: any, i: number) => (
              <div key={i} className="bg-card/50 border border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-gradient">{item.tier}</span>
                  <span className="text-sm text-muted-foreground">{item.range} followers</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.specialty}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-background border-border">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <service.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <span className="text-xs text-primary font-mono">{service.number}</span>
              <DialogTitle className="font-display text-xl">{service.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>
        <p className="text-muted-foreground">{service.description}</p>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
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
      id="services" 
      className={`py-32 px-6 md:px-12 lg:px-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="text-primary text-sm font-body tracking-widest uppercase mb-4 block">What We Do</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold">
            SERVICES THAT <span className="text-gradient">DOMINATE</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <button
              key={i}
              onClick={() => setSelectedService(service)}
              className={`group text-left p-8 border border-border bg-card/30 hover:bg-card/60 hover:border-primary/50 transition-all duration-500 cursor-pointer ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <service.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-4xl font-display font-bold text-muted-foreground/20 group-hover:text-primary/30 transition-colors">
                  {service.number}
                </span>
              </div>
              <h3 className="text-xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more →
              </div>
            </button>
          ))}
        </div>
      </div>

      <ServiceModal 
        service={selectedService} 
        open={!!selectedService} 
        onClose={() => setSelectedService(null)} 
      />
    </section>
  );
};

export default Services;
