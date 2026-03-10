export default function Hero() {
  return (
    <section className="w-full bg-gray-800 py-20 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 items-center gap-16">

        {/* LEFT SIDE */}
        <div className="animate-fadeInLeft">
          <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent max-w-lg">
            Organize your work. Collaborate with your team. Get things done with CollabBoard.
          </h1>

          <p className="mt-6 text-lg text-slate-200 max-w-lg">
            The simplest way to plan, track, and collaborate.
          </p>

          {/* signup */}
          <div className="flex gap-4 mt-8">
            <a
              href="/register"
              className="bg-gradient-to-r from-gray-200 to-gray-400 
              hover:scale-105 hover:shadow-xl
              transition-all duration-300
              px-6 py-3 rounded-lg font-medium"
            >
              Sign up – it's free!
            </a>
          </div>

          <p className="text-sm text-slate-100 mt-4">
            By entering your email you agree to our Privacy Policy.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex justify-center scale-125 animate-fadeInBoard">
          <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl w-[1000px]">

            {/* board header */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>

              <span className="ml-3 text-sm text-gray-300">
                CollabBoard – Product Launch
              </span>
            </div>

            {/* board columns */}
            <div className="grid grid-cols-3 gap-3 text-sm">

              {/* TODO */}
              <div className="bg-gray-800 rounded-lg p-3 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <p className="text-gray-300 font-semibold mb-2">To Do</p>

                <div className="bg-gray-700 rounded-md p-2 mb-2 hover:bg-gray-600 hover:scale-105 transition-all duration-300 cursor-pointer">
                  Design Landing
                </div>

                <div className="bg-gray-700 rounded-md p-2 hover:bg-gray-600 hover:scale-105 transition-all duration-300 cursor-pointer">
                  Invite Flow
                </div>
              </div>

              {/* DOING */}
              <div className="bg-gray-800 rounded-lg p-3 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <p className="text-gray-300 font-semibold mb-2">Doing</p>

                <div className="bg-gray-700 rounded-md p-2 mb-2 hover:bg-gray-600 hover:scale-105 transition-all duration-300 cursor-pointer">
                  Drag & Drop
                </div>

                <div className="bg-gray-700 rounded-md p-2 hover:bg-gray-600 hover:scale-105 transition-all duration-300 cursor-pointer">
                  WebSocket Sync
                </div>
              </div>

              {/* DONE */}
              <div className="bg-gray-800 rounded-lg p-3 hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <p className="text-gray-300 font-semibold mb-2">Done</p>

                <div className="bg-gray-700 rounded-md p-2 hover:bg-gray-600 hover:scale-105 transition-all duration-300 cursor-pointer">
                  Auth Setup
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}