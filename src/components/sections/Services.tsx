import { Zap, Target, TrendingUp, Megaphone, Video, Users } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Content Strategy',
    description: 'Data-driven content calendars that keep your audience hooked and coming back for more.',
    number: '01',
  },
  {
    icon: Target,
    title: 'Paid Social',
    description: 'Precision-targeted campaigns that turn ad spend into revenue and strangers into customers.',
    number: '02',
  },
  {
    icon: TrendingUp,
    title: 'Growth Hacking',
    description: 'Unconventional tactics that explode your following and dominate algorithms.',
    number: '03',
  },
  {
    icon: Megaphone,
    title: 'Influencer Marketing',
    description: 'Strategic partnerships with creators who actually move the needle.',
    number: '04',
  },
  {
    icon: Video,
    title: 'Video Production',
    description: 'Thumb-stopping short-form content that captures attention in 0.3 seconds.',
    number: '05',
  },
  {
    icon: Users,
    title: 'Community Management',
    description: 'Building loyal tribes that defend your brand and spread your message.',
    number: '06',
  },
];

const Services = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 bg-card">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20">
          <div className="space-y-4">
            <span className="inline-block px-4 py-2 border border-border text-sm font-body tracking-widest text-muted-foreground uppercase">
              What We Do
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[0.95]">
              SERVICES THAT
              <br />
              <span className="text-gradient">DOMINATE</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground text-lg leading-relaxed">
            We don't do cookie-cutter. Every strategy is forged specifically for your brand's world domination.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-card p-8 md:p-12 hover:bg-secondary/50 transition-colors duration-500"
            >
              <div className="flex items-start justify-between mb-8">
                <service.icon className="w-8 h-8 text-primary" />
                <span className="text-5xl font-display font-bold text-muted/30 group-hover:text-primary/20 transition-colors">
                  {service.number}
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
