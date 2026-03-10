import { Globe, Facebook, Linkedin, Twitter, Youtube, Instagram} from "lucide-react";
import { Link } from "react-router-dom";


export default function SpecialFooter() {
  return (
    <footer className="bg-[#1f3a5f] text-white px-10 py-6 text-sm">

      {/* Top Section */}
      <div className="flex justify-between items-start border-b border-white/20 pb-4">

        {/* Logo */}
        <div>
          <h1 className="text-lg font-semibold tracking-wide">
            CollabBoard
          </h1>

          <Link
            to="/login"
            className="block text-white/70 mt-2 hover:text-white"
          >
            Log In
          </Link>
        </div>

        {/* Links */}
        <div className="grid grid-cols-4 gap-12">

          <div>
            {/* <h2 className="font-semibold mb-1">About</h2>
            <p  className="text-white/70 hover:text-white">
              What's behind the boards
            </p> */}
          </div>

          <div>
            <h2 className="font-semibold mb-1">Jobs</h2>
            <a href="/invite-expired" className="text-white/70 hover:text-white">
              Join the team
            </a>
          </div>
          <div>
            <h2 className="font-semibold mb-1">Contact</h2>
            <a href="https://www.linkedin.com/in/hardik-goel-8ba42b244/" className="text-white/70 hover:text-white">
              Get in touch
            </a>
          </div>

          <div>
            <h2 className="font-semibold mb-1">Apps</h2>
            <p className="text-white/70 hover:text-white">
              Download our apps
            </p>
          </div>

          

        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex justify-between items-center pt-4">

        {/* Language */}
        <button className="flex items-center gap-3 text-white/80 hover:text-white">
          <Globe size={16} />
          English
        </button>

        {/* Legal Links */}
        <div className="flex gap-6 text-white/70">
          <p className="hover:text-white">Privacy Policy</p>
          <p className="hover:text-white">Terms</p>
          <span>© 2026 CollabBoard</span>
        </div>

        {/* Social */}
        <div className="flex gap-4 text-white/80">
          {/* <a href="#"><Instagram size={18} /></a> */}
          {/* <a href="#"><Facebook size={18} /></a> */}
          <a href ="https://www.linkedin.com/in/hardik-goel-8ba42b244/" target="_blank"><Linkedin size={18}  /></a>
          <a href="https://x.com/BinaryBuilder7"><Twitter size={18} /></a>
          {/* <a href="#"><Youtube size={18} /></a> */}
        </div>

      </div>
    </footer>
  );
}