import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50/30 pt-40 pb-24">
      {/* Decorative blur orbs */}
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-40 right-1/4 w-[600px] h-[600px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-block mb-4 px-4 py-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-full">
            <span className="text-sm font-medium text-gray-700">Welcome to CollabBoard</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold leading-tight text-gray-900 mb-6">
            Real-time collaboration
            <br />
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              without the chaos
            </span>
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto">
            CollabBoard brings your team into perfect sync. Plan, track, and deliver together with real-time updates and zero friction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/register"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl text-base"
            >
              Start for free
            </a>

            <a
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 hover:bg-white/50 transition-all text-base"
            >
              Sign in
            </a>
          </div>

          <p className="text-sm text-gray-500">
            No credit card required. Free forever plan included.
          </p>
        </motion.div>

        {/* Large Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative group"
        >
          {/* Glow behind card */}
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400/30 to-cyan-400/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Dashboard Card */}
          <div className="relative bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="border-b border-white/30 bg-gradient-to-r from-white to-blue-50/50 px-8 py-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Product Roadmap</h2>
                <p className="text-sm text-gray-600 mt-1">Q2 2024 Sprint</p>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-8 space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "In Progress", value: "12", color: "from-blue-100 to-blue-50" },
                  { label: "Completed", value: "24", color: "from-green-100 to-green-50" },
                  { label: "Blocked", value: "3", color: "from-orange-100 to-orange-50" },
                  { label: "Team Members", value: "8", color: "from-indigo-100 to-indigo-50" },
                ].map((stat, i) => (
                  <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-lg p-4 border border-white/50`}>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Kanban Columns */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    title: "To Do",
                    color: "from-gray-100 to-gray-50",
                    tasks: ["Design system", "API integration", "Testing framework"],
                  },
                  {
                    title: "In Progress",
                    color: "from-blue-100 to-blue-50",
                    tasks: ["Frontend setup", "Database schema", "Auth module"],
                  },
                  {
                    title: "Done",
                    color: "from-green-100 to-green-50",
                    tasks: ["Project kickoff", "Branding", "Planning"],
                  },
                ].map((column, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{column.title}</h3>
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {column.tasks.length}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {column.tasks.map((task, j) => (
                        <div
                          key={j}
                          className={`bg-gradient-to-br ${column.color} rounded-lg p-3 border border-white/50 shadow-sm hover:shadow-md transition-all`}
                        >
                          <p className="text-sm font-medium text-gray-800">{task}</p>
                          <div className="flex gap-2 mt-2">
                            <div className="w-6 h-6 rounded-full bg-indigo-200 border border-indigo-300" />
                            <div className="w-6 h-6 rounded-full bg-cyan-200 border border-cyan-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating Detail Card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-8 -right-8 bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl shadow-2xl p-4 max-w-xs z-10"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-cyan-400" />
              <div>
                <p className="font-semibold text-sm text-gray-900">Live updates</p>
                <p className="text-xs text-gray-600">Synced in real-time</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
