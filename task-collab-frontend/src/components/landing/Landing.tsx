import Hero from "./Hero";
import Features from "./Features";
import CTA from "./Cta";
import SpecialFooter from "../SpecialFooter";

export default function Landing() {
  return (
    <div className="bg-white">
      <Hero />
      <Features />
      <CTA />
      <SpecialFooter />
    </div>
  );
}
