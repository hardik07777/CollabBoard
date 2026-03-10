import Hero from "./Hero";
import Features from "./Features";
import CTA from "./Cta";
import SpecialFooter from "../specialfooter";

export default function Landing() {
  return (
    <>
      <Hero />

      {/* Curvy Divider */}
      <div className=" bg-gray-800">
        <svg
          className="w-full"
          viewBox="0 0 1440 120"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64V120H0Z" />
        </svg>
      </div>

      <Features />
      {/* Curvy Divider */}
      <div className="bg-gray-50">
        <svg
          className="w-full"
          viewBox="0 0 1440 120"
          fill="bg-black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64V120H0Z" />
        </svg>
      </div>


      <CTA />
      {/* Curvy Divider */}
<div className="bg-black">
  <svg
    className="min-w-9 -mb-1"
    viewBox="0 0 1440 120"
    fill="#1f3a5f"   
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64V120H0Z" />
  </svg>
</div>


      <SpecialFooter />
    </>
  );
}