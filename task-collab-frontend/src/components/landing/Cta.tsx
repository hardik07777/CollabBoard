import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50 to-white" />

      {/* Decorative blur orbs */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative max-w-4xl mx-auto text-center"
      >
        {/* Badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-block mb-6 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-full"
        >
          <span className="text-sm font-medium text-gray-700">
            Join thousands of happy teams
          </span>
        </motion.div>

        {/* Heading */}
        <h2 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Ready to level up?
        </h2>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-2xl mx-auto">
          Start with CollabBoard today. No credit card required. Set up takes less than 2 minutes.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <motion.button
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-base"
          >
            Get started free
          </motion.button>

          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-white/50 transition-all text-base"
          >
            Schedule a demo
          </motion.button>
        </div>

        {/* Trust line */}
        <p className="text-sm text-gray-500">
          Enterprise plans available. Custom integrations supported.
        </p>
      </motion.div>
    </section>
  );
}
