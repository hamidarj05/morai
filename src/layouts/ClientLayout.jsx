import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { logout } from "../auth/authService";
import { useNavigate } from "react-router-dom";

export default function ClientLayout() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    const parsedUser = JSON.parse(user);
    if (parsedUser && parsedUser.role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl p-3 sm:p-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 overflow-hidden"> 
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/60 p-4">
            <div>
              <div className="font-extrabold text-lg">Morocco AI Guide 🇲🇦</div>
              <div className="text-xs text-white/70">Client Dashboard</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-[260px_1fr] h-[85vh]"> 
            <div className="border-r border-white/10 bg-slate-900/60 p-3">

              <nav className="space-y-2">
                <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/feed">
                  Feed
                </Link>
                <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/create">
                  Create Post
                </Link>
                <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/chat/1">
                  Chat
                </Link>

                <Link
                  className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
                  to="/userPosts">
                  My Posts
                </Link>
                <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/profile">
                  Profile
                </Link>


                <div className="pt-2 mt-2 border-t border-white/10" />
                {isAdmin && (
                  <Link className="block rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" to="/admin">
                    Admin Panel
                  </Link>
                )}
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
