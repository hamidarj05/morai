import { useNavigate } from "react-router-dom";
import { logout } from "../auth/authService";



export default function ProfilePage() {
  const navigate = useNavigate()
  const user = localStorage.getItem("currentUser");
  const userData = user ? JSON.parse(user) : null;
  const isAdmin = user ? JSON.parse(user).role === "admin" : false;
  if (!userData) {
    return (
      <div className="text-white/70">
        No user data found.
      </div>
    );
  }
  function go(path) {
    navigate(path)
  }
  function doLogout() {
    logout();
    navigate("/login");
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

          <div className="flex justify-between gap-4">
            <div className="text-lg font-extrabold">
              Hello {userData.name}
            </div>

            <div
              className="sm:hidden "
            >
              {isAdmin && (
                <button
                  onClick={() => go("/admin")}
                  className="rounded-xl mr-2 border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
                >
                  Admin panel
                </button>
              )}
              <button
                onClick={doLogout}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                Logout
              </button>

            </div>
          </div>
        </div>


        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-sm">
            <div className="text-xs text-white/60">Email</div>
            <div className="font-bold capitalize">{userData.email}</div>
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
              Edit profile
            </button>

            <button
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              disabled
            >
              Change password
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
