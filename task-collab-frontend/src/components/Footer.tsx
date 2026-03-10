export default function Footer() {
  return (
    <footer className=" bg-white/80 backdrop-blur-md border-t border-gray-200">
      <div className="w-full px-6 h-14 flex items-center justify-between text-sm text-gray-500">

        {/* Left */}
        <div className="font-semibold text-gray-800">
          CollabBoard
        </div>

        {/* Center */}
        <div className="flex items-center gap-6">
          <p>About</p>
          <p>terms</p>
          <p>Privacy</p>

            
          
        </div>

        {/* Right */}
        <div>
          <span className="
            ml-1
            px-3 py-1
            text-xs font-medium
            text-pink-600
            bg-pink-50
            border border-pink-200
            rounded-full
            transition
          ">
            You're officially my friend 
          </span>
        </div>

      </div>
    </footer>
  );
}