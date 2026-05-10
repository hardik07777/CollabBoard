import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Dark gradient background with premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />

      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity }}
        className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto text-center"
      >
        {/* Icon badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-flex mb-8"
        >
          <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-300" />
              <p className="text-sm font-medium text-blue-300">Ready to get started?</p>
            </div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight mb-8">
          Your team's productivity
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 bg-clip-text text-transparent">
            starts here
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-12">
          Join hundreds of teams collaborating smarter with CollabBoard. Start building your perfect workflow today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <motion.button
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-2xl hover:shadow-blue-500/50 transition-all duration-300"
          >
            <span className="flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>

          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-gray-600 text-gray-300 font-semibold rounded-xl hover:border-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            Sign In
          </motion.button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>No credit card required</span>
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Instant setup</span>
          </div>
          <div className="hidden sm:block">•</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>Free forever plan</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
