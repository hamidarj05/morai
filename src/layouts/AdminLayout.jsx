import { useState } from "react";
import {Outlet, useNavigate } from "react-router-dom";
import { logout } from "../auth/authService"; 

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function go(path) {
    navigate(path);
    setSidebarOpen(false); 
  }

  function doLogout() {
    logout();
    navigate("/login");
  }

  const AdminNav = () => (
    <nav className="space-y-2">
      <button
        onClick={() => go("/admin")}
        className="w-full text-left rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
      >
        Dashboard
      </button>

      <button
        onClick={() => go("/admin/cities")}
        className="w-full text-left rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
      >
        Manage Cities
      </button>

      <button
        onClick={() => go("/admin/spots")}
        className="w-full text-left rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
      >
        Manage Spots
      </button>

      <button
        onClick={() => go("/admin/scams")}
        className="w-full text-left rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
      >
        Manage Scams
      </button>

      <button
        onClick={() => go("/admin/posts")}
        className="w-full text-left rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
      >
        Manage Posts
      </button>

      <div className="pt-2 mt-2 border-t border-white/10" />

      <button
        onClick={() => go("/feed")}
        className="w-full text-left rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
      >
        Back to Client
      </button>

      <button
        onClick={doLogout}
        className="w-full text-left rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10"
      >
        Logout
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-6xl p-3 sm:p-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/40 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/60 p-4">
            <div>
              <div className="font-extrabold text-lg">MorAI Guide Dashboard</div>
              <div className="text-xs text-white/70">
                Morocco AI Guide Admin
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(true)}
              className="sm:hidden rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              ☰
            </button>
          </div>

          <div className="grid sm:grid-cols-[260px_1fr] h-[85vh]">
            <div className="hidden sm:block border-r border-white/10 bg-slate-900/60 p-3"> 
              <AdminNav />
            </div>
 
            <div className="p-4 overflow-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
 
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 sm:hidden"> 
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />
 
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-[320px] border-r border-white/10 bg-slate-950 p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-extrabold">Morocco AI Guide Dashboard</div> 
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                ✖
              </button>
            </div>

            <AdminNav />
          </div>
        </div>
      )}
    </div>
  );
}
