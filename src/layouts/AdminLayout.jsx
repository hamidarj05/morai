import React from "react";
import { Link, Outlet } from "react-router-dom";
import { logout } from "../auth/authService";
import { useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate(); 
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl p-3 sm:p-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/60 p-4">
            <div>
              <div className="font-extrabold text-lg">Admin Dashboard</div>
              <div className="text-xs text-white/70">Manage cities, posts, scams...</div>
            </div>
            <Link className="text-sm text-white/80 hover:text-white" to="/feed">
              Back to Client
            </Link>
          </div>

          <div className="grid sm:grid-cols-[260px_1fr] h-[85vh]">
            <div className="border-r border-white/10 bg-slate-900/60 p-3">
              <div className="text-xs text-white/70 mb-2">Admin Menu</div>

              <nav className="space-y-2">
                <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/admin">
                  Dashboard
                </Link>
                <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/admin/cities">
                  Manage Cities
                </Link>
                <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/admin/spots">
                  Manage Spots
                </Link>
                <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/admin/scams">
                  Manage Scams
                </Link>
                <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/admin/posts">
                  Manage Posts
                </Link>
                <div className="pt-2 mt-2 border-t border-white/10" />
                <button
                  className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                  onClick={() => { logout(); navigate("/login"); }}>
                    {/* pour rediriger vers login */}
                  Logout
                </button>
              </nav>
            </div>

            {/* Le contenue de page */}
            <div className="p-4 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
