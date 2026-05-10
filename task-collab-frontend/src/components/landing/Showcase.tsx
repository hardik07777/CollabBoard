import { motion } from "framer-motion";

export default function Showcase() {
  return (
    <section className="py-32 px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Productivity at scale
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how teams boost efficiency with CollabBoard
          </p>
        </motion.div>

        {/* Showcase Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Overlapping Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative h-[600px]"
          >
            {/* Card 1 */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute top-0 left-0 w-80 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg p-6 z-30"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-200" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Sprint Planning</p>
                    <p className="text-gray-600">Q2 Goals</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-indigo-200 rounded-full w-full" />
                  <div className="h-2 bg-indigo-100 rounded-full w-3/4" />
                </div>
              </div>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute top-32 left-32 w-80 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg p-6 z-20"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-cyan-200" />
                  <div className="text-sm">
                    <p className="font-semibold text-gray-900">Team Velocity</p>
                    <p className="text-gray-600">+24% this sprint</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex-1 h-12 bg-cyan-100 rounded" />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5.5, repeat: Infinity }}
              className="absolute top-64 left-16 w-80 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg p-6 z-10"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900">Active Team</p>
                  <span className="text-green-600 text-sm font-semibold">Live</span>
                </div>
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-indigo-300 to-cyan-300"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Features List */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                title: "Drag & Drop Workflows",
                description:
                  "Reorganize tasks with intuitive drag and drop. No learning curve.",
              },
              {
                title: "Live Collaboration",
                description:
                  "See team members work in real-time. Comments and mentions built-in.",
              },
              {
                title: "Smart Analytics",
                description:
                  "Track progress, velocity, and team performance with beautiful charts.",
              },
              {
                title: "Automation Ready",
                description:
                  "Connect to your favorite tools. Webhooks and integrations available.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white flex items-center justify-center font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
