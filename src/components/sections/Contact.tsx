import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <section className="py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-8 mb-16">
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

        <div className="flex justify-center">
          <Button variant="primary" size="xl" className="group">
            Start a Project
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Contact info */}
        <div className="mt-24 pt-12 border-t border-border grid md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Email</div>
            <a href="mailto:hello@socialdominance.co" className="text-lg font-display font-bold hover:text-primary transition-colors">
              hello@socialdominance.co
            </a>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Phone</div>
            <a href="tel:+1234567890" className="text-lg font-display font-bold hover:text-primary transition-colors">
              +1 (234) 567-890
            </a>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground uppercase tracking-wider">Location</div>
            <div className="text-lg font-display font-bold">
              New York / Los Angeles / London
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
