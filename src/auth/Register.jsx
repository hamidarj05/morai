import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "./authService";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Name is required.");
    if (!email.trim()) return setError("Email is required.");
    if (!password.trim() || password.length < 4)
      return setError("Password must be at least 4 characters.");

    setLoading(true);

    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      navigate("/feed");
    } catch (e2) {
      setError(String(e2.message || e2));
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/40 p-6">
        <div className="text-2xl font-extrabold">Register</div>
        <div className="text-sm text-white/60 mt-1">
          Join Us Now in our community of morocco ai guide
        </div>

        {error ? (
          <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm">
            <b>Error:</b> {error}
          </div>
        ) : null}

        <form onSubmit={submit} className="mt-4 space-y-3">
          <div>
            <div className="text-xs text-white/70 mb-1">Name</div>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div>
            <div className="text-xs text-white/70 mb-1">Email</div>
            <input
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
            />
          </div>

          <div>
            <div className="text-xs text-white/70 mb-1">Password</div>
            <input
              type="password"
              className="w-full rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="min 4 chars"
            />
          </div>

          <button
            disabled={loading}
            className={[
              "w-full rounded-2xl px-4 py-3 text-sm font-extrabold",
              loading
                ? "bg-emerald-500/40 text-white/70 cursor-not-allowed"
                : "bg-emerald-500 text-slate-950 hover:bg-emerald-400",
            ].join(" ")}
          >
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-white/70">
          Already have an account?{" "}
          <Link className="text-emerald-300 hover:text-emerald-200" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
