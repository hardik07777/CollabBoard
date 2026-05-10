import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white pt-20 pb-32">
      <div className="relative max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center pt-12">
          {/* LEFT SIDE - CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Small label */}
            <div className="text-sm font-medium text-gray-600">
              Collaboration made simple
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl lg:text-6xl font-medium leading-tight text-gray-900">
              Real-time teamwork. No complexity.
            </h1>

            {/* Subheading */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg font-light">
              CollabBoard brings your team together. Plan projects, track progress, and collaborate in real-time without the overhead.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/register"
                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors text-sm"
              >
                Start for free
              </a>

              <a
                href="/login"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors text-sm"
              >
                Sign in
              </a>
            </div>

            {/* Trust line */}
            <p className="text-sm text-gray-500 pt-2">
              No credit card required. Free forever plan available.
            </p>
          </motion.div>

          {/* RIGHT SIDE - DASHBOARD PREVIEW */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Project Board</h3>
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
              </div>

              {/* Columns */}
              <div className="grid grid-cols-3 gap-4">
                {/* TODO */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">To Do</p>
                  <div className="space-y-2">
                    <div className="bg-gray-50 border border-gray-100 rounded p-2 text-xs text-gray-700">
                      Design mockups
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded p-2 text-xs text-gray-700">
                      API setup
                    </div>
                  </div>
                </div>

                {/* IN PROGRESS */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">In Progress</p>
                  <div className="space-y-2">
                    <div className="bg-blue-50 border border-blue-100 rounded p-2 text-xs text-gray-700">
                      Frontend build
                    </div>
                  </div>
                </div>

                {/* DONE */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Done</p>
                  <div className="space-y-2">
                    <div className="bg-green-50 border border-green-100 rounded p-2 text-xs text-gray-700">
                      ✓ Planning
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
