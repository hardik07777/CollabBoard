import { motion } from "framer-motion";
import { Zap, ShieldCheck, BarChart3, Move3d, Users, MessageSquare } from "lucide-react";

const features = [
  {
    title: "Real-Time Sync",
    desc: "Instant board updates powered by WebSockets for seamless collaboration.",
    icon: Zap,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Secure Collaboration",
    desc: "Role-based access with JWT authentication and board isolation.",
    icon: ShieldCheck,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Activity Tracking",
    desc: "Complete history and audit logs for accountability and insights.",
    icon: BarChart3,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Drag & Drop",
    desc: "Smooth task movement with optimistic UI and instant feedback.",
    icon: Move3d,
    color: "from-orange-500 to-red-500",
  },
  {
    title: "Team Management",
    desc: "Invite teammates, manage permissions, and organize by role.",
    icon: Users,
    color: "from-indigo-500 to-blue-500",
  },
  {
    title: "Instant Messaging",
    desc: "Built-in communication to keep discussions contextual and organized.",
    icon: MessageSquare,
    color: "from-pink-500 to-purple-500",
  },
];

export default function Features() {
  return (
    <section className="relative py-32 px-6 bg-white overflow-hidden">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex mb-4">
            <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-200/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-blue-700">🚀 Powerful Features</p>
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Everything your team needs
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Built with modern teams in mind. Powerful features that scale with your needs.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-white/80 backdrop-blur-xl p-8 rounded-2xl border border-white/40 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

                {/* Icon background glow */}
                <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${feature.color} rounded-full opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500`} />

                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg group-hover:shadow-xl transition-all`}>
                    <Icon size={28} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-gray-600 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r ${feature.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
