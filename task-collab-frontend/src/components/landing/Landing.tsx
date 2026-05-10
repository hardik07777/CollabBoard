import Navbar from "./Navbar";
import Hero from "./Hero";
import Trust from "./Trust";
import BentoFeatures from "./BentoFeatures";
import Showcase from "./Showcase";
import Testimonials from "./Testimonials";
import CTA from "./Cta";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div className="bg-white overflow-hidden">
      <Navbar />
      <Hero />
      <Trust />
      <BentoFeatures />
      <Showcase />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
