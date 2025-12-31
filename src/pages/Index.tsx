import FluidCursor from '@/components/FluidCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Work from '@/components/sections/Work';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

const Index = () => {
  return (
    <SmoothScroll>
      <FluidCursor />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <section id="services">
          <Services />
        </section>
        <section id="work">
          <Work />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </SmoothScroll>
  );
};

export default Index;
