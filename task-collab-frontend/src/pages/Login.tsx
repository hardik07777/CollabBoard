import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axios"; // use your configured axios
import { useAuthStore } from "../store/auth.store";
import { motion } from "framer-motion";
import Particles from "../components/Particles";

interface LoginResponse {
  user: {
    _id: string;   // IMPORTANT: match your store interface
    name: string;
    email: string;
  };
  token: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore(); // ✅ use setAuth

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post<LoginResponse>("/auth/login", {
        email,
        password,
      });
      return res.data;
    },
    onSuccess: (data) => {
      // ✅ Use your store method
      setAuth(data.user, data.token);

      // ✅ Navigate correctly
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error.response?.data || error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

 return (
  <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

    {/* Background Particles */}
    <Particles quantity={70} />

    {/* Optional soft overlay for readability */}
    <div className="absolute inset-0 bg-black/40 -z-5" />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative z-10 w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-3xl p-10 text-gray-900"
    >

      <h1 className="text-3xl font-bold text-center">
        Welcome Back
      </h1>

      <p className="text-sm text-gray-600 text-center mt-2 mb-10">
        Sign in to continue to CollabBoard
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        className="w-full focus:shadow-md px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full focus:shadow-md px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-900 hover:opacity-90 text-white font-semibold rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In"}
        </button>

        {loginMutation.isError && (
          <p className="text-sm text-red-400 text-center">
            Invalid email or password
          </p>
        )}
      </form>

      <p className="text-center text-sm text-gray-500 mt-8">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-gray-700 font-semibold cursor-pointer hover:underline"
        >
          Create one
        </span>
      </p>

    </motion.div>
  </div>
);
}
