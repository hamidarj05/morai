import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();

  const user = localStorage.getItem("currentUser");
  const userData = user ? JSON.parse(user) : null;

  if (!userData) {
    return (
      <div className="text-white/70">
        No user data found.
      </div>
    );
  } 
   

  return (
    <div> 
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <div className="text-xl font-extrabold">Profile</div>
          <div className="text-sm text-white/60">
            Manage your personal information
          </div>
        </div> 
      </div>

     
      <div className="rounded-2xl border border-white/10 bg-white/5 p-5 max-w-xl">
        <div className="flex items-center gap-4"> 

          <div>
            <div className="text-lg font-extrabold">{userData.name}</div>
            <div className="text-sm text-white/60">{userData.email}</div>
          </div>
        </div>

        
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-sm">
            <div className="text-xs text-white/60">Role</div>
            <div className="font-bold capitalize">{userData.role}</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-sm">
            <div className="text-xs text-white/60">Member since</div>
            <div className="font-bold">
              {userData.createdAt
                ? new Date(userData.createdAt).toLocaleDateString()
                : "—"}
            </div>
          </div>
        </div>

         <div className="mt-5 border-t border-white/10 pt-4"> 
          <div className="flex gap-2 flex-wrap">
            <button
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              disabled
            >
              Edit profile (Ftri9)
            </button>

            <button
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              disabled
            >
              Change password (Ftri9)
            </button>
          </div>
 
        </div>
      </div>
    </div>
  );
}
