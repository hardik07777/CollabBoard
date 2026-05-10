import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white pt-32 pb-24">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-white to-purple-50/40 pointer-events-none" />
      
      {/* Decorative glassmorphism blur elements */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT SIDE - CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex">
              <div className="px-4 py-2 rounded-full bg-blue-50 border border-blue-200/50 backdrop-blur-sm">
                <p className="text-sm font-medium text-blue-700">✨ Real-time collaboration, made simple</p>
              </div>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-gray-900 tracking-tight">
                Organize Work.
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Collaborate Better.
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              CollabBoard makes it effortless to plan, track, and deliver with your team. Real-time sync. Zero friction.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.a
                href="/register"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a
                href="/login"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                Sign In
              </motion.a>
            </div>

            {/* Trust line */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-xs text-white font-bold"
                  >
                    {i}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                Trusted by teams building great products
              </p>
            </div>
          </motion.div>

          {/* RIGHT SIDE - BOARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            {/* Glassmorphic card container */}
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition duration-500" />

              {/* Main board card */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/40 shadow-2xl p-8 overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/30 pointer-events-none rounded-2xl" />

                <div className="relative space-y-4">
                  {/* Board Header */}
                  <div className="flex items-center justify-between pb-6 border-b border-gray-200/50">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">Product Launch</h3>
                      <p className="text-xs text-gray-500 mt-1">3 columns • 8 tasks</p>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                  </div>

                  {/* Board Columns */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* TODO Column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">To Do</h4>
                      <div className="space-y-2">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-lg p-3 text-sm text-gray-700 font-medium hover:shadow-md transition-all">
                          Design System
                        </div>
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-lg p-3 text-sm text-gray-700 font-medium hover:shadow-md transition-all">
                          Setup Payments
                        </div>
                      </div>
                    </div>

                    {/* DOING Column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">In Progress</h4>
                      <div className="space-y-2">
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 rounded-lg p-3 text-sm text-gray-700 font-medium hover:shadow-md transition-all">
                          Real-time Sync
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200/50 rounded-lg p-3 text-sm text-gray-700 font-medium hover:shadow-md transition-all">
                          Auth Flow
                        </div>
                      </div>
                    </div>

                    {/* DONE Column */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Completed</h4>
                      <div className="space-y-2">
                        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 rounded-lg p-3 text-sm text-gray-700 font-medium hover:shadow-md transition-all">
                          ✓ Database Setup
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200/50 rounded-lg p-3 text-sm text-gray-700 font-medium hover:shadow-md transition-all">
                          ✓ API Endpoints
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-xl rounded-xl border border-white/40 shadow-xl p-4 max-w-xs"
            >
              <p className="text-sm font-semibold text-gray-900">
                ⚡ Synced in real-time
              </p>
              <p className="text-xs text-gray-600 mt-1">
                All changes instantly reflected across your team
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
