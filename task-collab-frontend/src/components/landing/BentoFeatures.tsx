import { motion } from "framer-motion";
import { Zap, Users, BarChart3, Clock, Lock, Zap as ZapIcon } from "lucide-react";

const features = [
  {
    title: "Real-time Sync",
    description: "Live updates across your entire team instantly",
    icon: Zap,
    color: "from-blue-400 to-cyan-400",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Team Collaboration",
    description: "Work together seamlessly with smart permissions",
    icon: Users,
    color: "from-purple-400 to-pink-400",
    span: "col-span-2 row-span-1",
  },
  {
    title: "Analytics & Insights",
    description: "Track productivity with detailed analytics",
    icon: BarChart3,
    color: "from-green-400 to-emerald-400",
    span: "col-span-1 row-span-2",
  },
  {
    title: "Activity Timeline",
    description: "Complete audit trail of all team activities",
    icon: Clock,
    color: "from-orange-400 to-red-400",
    span: "col-span-1 row-span-1",
  },
  {
    title: "Enterprise Security",
    description: "Bank-level encryption and compliance",
    icon: Lock,
    color: "from-indigo-400 to-blue-400",
    span: "col-span-1 row-span-1",
  },
];

export default function BentoFeatures() {
  return (
    <section id="features" className="py-32 px-6 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Everything you need
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed for modern teams
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
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
                className={`${feature.span} group relative bg-white/60 backdrop-blur-xl border border-white/50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all overflow-hidden`}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Bottom accent */}
                  <div className={`h-1 w-12 bg-gradient-to-r ${feature.color} rounded-full group-hover:w-20 transition-all`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
