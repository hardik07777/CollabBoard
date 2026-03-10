import { motion } from "framer-motion";
import { Zap, ShieldCheck, History, Move } from "lucide-react";

const features = [
  {
    title: "Real-Time Sync",
    desc: "Instant board updates powered by WebSockets.",
    icon: Zap,
  },
  {
    title: "Role-Based Access",
    desc: "Secure collaboration with JWT authentication.",
    icon: ShieldCheck,
  },
  {
    title: "Activity Logs",
    desc: "Persistent history with board-level isolation.",
    icon: History,
  },
  {
    title: "Drag & Drop",
    desc: "Smooth task movement with optimistic UI.",
    icon: Move,
  },
];

export default function Features() {
  return (
    <section className="relative py-28 px-6 bg-gradient-to-b from-white to-gray-50 overflow-hidden">

      {/* Subtle background glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-white blur-3xl opacity-30 rounded-full" />

      <div className="relative max-w-6xl mx-auto text-center">

        {/* Section Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-gray-900"
        >
          Built for Modern Teams
        </motion.h2>

        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need for seamless, real-time collaboration — designed
          with scalability and performance in mind.
        </p>

        {/* Feature Grid */}
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Gradient top bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-t-2xl opacity-0 group-hover:opacity-100 transition" />

                {/* Icon */}
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-6 group-hover:bg-indigo-100 transition">
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </div>
    </section>
  );
}