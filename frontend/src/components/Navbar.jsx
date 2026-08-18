import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center pb-6 mb-8 border-b border-slate-800 gap-4">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">CodeRefine</h1>
        </div>
        <p className="text-sm text-slate-400 mt-1">AI-Powered Code Review & Optimization Platform</p>
      </div>

      <nav className="flex items-center gap-3">
        <button
          onClick={() => navigate("/dashboard")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            isActive("/dashboard")
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
        >
          Home
        </button>

        <button
          onClick={() => navigate("/history")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            isActive("/history")
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
          }`}
        >
          Reviews History
        </button>

        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600/80 hover:bg-red-600 text-white transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}