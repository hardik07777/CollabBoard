import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function CTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-black text-white">

      {/* Background Glow */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gray-500 rounded-full blur-3xl opacity-20"
      />

      <motion.div
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gray-400 rounded-full blur-3xl opacity-20"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative max-w-3xl mx-auto text-center"
      >
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Plan Together <br />
          <span className="bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent">
             Deliver Faster
          </span>
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
          Create boards, invite teammates, and collaborate in real time.
          Move tasks, track progress, and stay aligned effortlessly.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex justify-center gap-5 flex-wrap">

          <button
            onClick={() => navigate("/register")}
            className="group relative px-8 py-4 rounded-xl font-semibold bg-white text-black shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Get Started Free
            <span className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 blur-xl transition"></span>
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 border border-gray-500 rounded-xl font-semibold text-gray-200 hover:bg-white/10 hover:border-gray-300 transition-all duration-300"
          >
            Login
          </button>

        </div>

        {/* Trust line */}
        <p className="mt-8 text-sm text-gray-400 tracking-wide">
           Instant Sync •  Secure Auth •  Built for Modern Teams
        </p>
      </motion.div>
    </section>
  );
}