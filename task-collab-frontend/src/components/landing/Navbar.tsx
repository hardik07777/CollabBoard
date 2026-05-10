import { motion } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  window.addEventListener("scroll", () => {
    setIsScrolled(window.scrollY > 50);
  });

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md border border-white/30 shadow-xl"
          : "bg-white/40 backdrop-blur-md border border-white/20"
      } rounded-full px-8 py-4`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-lg" />
          <span className="font-semibold text-gray-900">CollabBoard</span>
        </div>

        {/* Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-700 hover:text-gray-900 transition">
            Features
          </a>
          <a href="#testimonials" className="text-sm text-gray-700 hover:text-gray-900 transition">
            Testimonials
          </a>
          <a href="#pricing" className="text-sm text-gray-700 hover:text-gray-900 transition">
            Pricing
          </a>
        </div>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition hidden sm:block"
          >
            Sign in
          </a>
          <a
            href="/register"
            className="text-sm font-medium bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
          >
            Get started
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
