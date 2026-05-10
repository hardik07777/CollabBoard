import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        {/* Small label */}
        <div className="text-sm font-medium text-gray-600 mb-4">
          Ready to get started?
        </div>

        {/* Heading */}
        <h2 className="text-5xl lg:text-6xl font-medium text-gray-900 mb-6 leading-tight">
          Start collaborating today
        </h2>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">
          Join teams using CollabBoard to build better, faster. No credit card required.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={() => navigate("/register")}
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-sm"
          >
            Start for free
          </button>

          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm"
          >
            Sign in
          </button>
        </div>

        {/* Trust line */}
        <p className="text-sm text-gray-500">
          No credit card required. Free forever plan available.
        </p>
      </motion.div>
    </section>
  );
}
