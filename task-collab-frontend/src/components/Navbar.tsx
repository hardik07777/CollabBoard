import { Bell, Search, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useState } from "react";
import { LogOut } from "lucide-react";

interface NavbarProps {
  boardName?: string;
}

export default function Navbar({ boardName }: NavbarProps) {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
   <div className="sticky top-0 z-50 bg-white/0 backdrop-blur-sm border-b border-black/5">
  <div className="w-full px-8 py-4 flex items-center justify-between">
    
    {/* Left */}
    <div className="flex items-center gap-10">
      <h1
        onClick={() => navigate("/dashboard")}
        className="text-2xl font-semibold cursor-pointer 
                   bg-gradient-to-r from-black to-gray-400
                   bg-clip-text text-transparent"
      >
        CollabBoard
      </h1>

      {boardName && (
        <span className="text-xl font-semibold text-gray-800">
          {boardName}
        </span>
      )}
    </div>

    {/* Right */}
    <div className="flex items-center gap-4">
      <button
  onClick={handleLogout}
  className="w-full flex items-center gap-2 text-left px-4 py-2 
            from-gray-100 to gray-200 hover:bg-red-50 
             rounded-b-xl transition"
>
  Logout
</button>

      {user && (
        <>
          {/* Notification */}
          <button className="relative p-2 rounded-full 
                             hover:bg-black/5 
                             transition">
            <Bell size={20} className="text-gray-600" />
          </button>

          {/* Avatar */}
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="w-9 h-9 rounded-full 
                         bg-gradient-to-r from-blue-500 to-purple-500 
                         flex items-center justify-center 
                         text-white font-semibold 
                         cursor-pointer shadow-sm"
            >
              {user.email?.[0]?.toUpperCase()}
            </div>

            {open && (
              <div className="absolute right-0 mt-2 w-44 
                              bg-white/80 backdrop-blur-lg 
                              border border-black/5 
                              rounded-xl shadow-lg">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 
                             hover:bg-black/5 rounded-t-xl"
                >
                  Profile
                </button>
                
              </div>
            )}
          </div>
        </>
      )}

      {/* {!user && (
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 
                     border border-black/10 
                     rounded-xl 
                     hover:bg-black/5 
                     transition"
        >
          Login
        </button>
      )} */}
    </div>
  </div>
</div>
  );
}
