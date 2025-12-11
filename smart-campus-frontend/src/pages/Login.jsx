// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // AuthContext -> login -> backend /api/auth/login pe call
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err.response?.data?.message || "Invalid email or password.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="grid w-full max-w-5xl gap-8 rounded-3xl bg-white p-6 shadow-2xl shadow-slate-200 md:grid-cols-[1.05fr,0.95fr] md:p-10">
        {/* Left: brand + illustration style */}
        <div className="relative hidden flex-col justify-between rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-7 text-slate-50 md:flex">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-300">
              Smart Campus
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-tight">
              Smart, minimal
              <br />
              and secure campus control.
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              Monitor resources, bookings and incidents from one clean dashboard
              designed for today&apos;s campuses.
            </p>
          </div>

          <div className="mt-6 space-y-3 text-sm text-slate-200">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              <p>Real-time incident feeds for security & admin teams.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
              <p>Frictionless bookings for labs, rooms and facilities.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" />
              <p>Role-based access for students, admins & security staff.</p>
            </div>
          </div>

          <p className="mt-6 text-[11px] text-slate-400">
            Tip: Use your institute email. Contact the campus admin if you
            can&apos;t access your account.
          </p>

          <div className="pointer-events-none absolute -right-10 bottom-8 hidden h-28 w-28 rounded-3xl border border-slate-700/60 bg-slate-900/80 backdrop-blur md:block" />
        </div>

        {/* Right: actual login card */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Sign in
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              Welcome back
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Login to access your dashboard, bookings and incident reports.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@college.edu"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="space-y-1">
              <label className="flex items-center justify-between text-xs font-medium text-slate-700">
                <span>Password</span>
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-[11px] text-slate-500 hover:text-slate-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-1 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-[11px] text-slate-500">
                <input
                  type="checkbox"
                  className="h-3 w-3 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
                />
                Remember this device
              </label>
              {/* Optional: Forgot password link */}
            </div>

            {error && (
              <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] text-rose-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-slate-300/50 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing you in..." : "Login to dashboard"}
            </button>
          </form>

          <p className="mt-4 text-[11px] text-slate-500">
            New to Smart Campus?{" "}
            <Link
              to="/signup"
              className="font-medium text-slate-900 underline-offset-2 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
