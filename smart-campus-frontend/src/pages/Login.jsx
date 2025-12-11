import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await login(form.email, form.password);
    if (res.success) {
      navigate("/dashboard");
    } else {
      setError(res.message || "Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full grid gap-10 lg:grid-cols-[1.2fr,1fr] items-center">
        {/* Left panel */}
        <div className="hidden lg:block text-slate-100">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Smart Campus <span className="text-indigo-400">Resource & Safety</span> System
          </h1>
          <p className="text-sm text-slate-300 mb-6 max-w-md">
            Manage lab and hall bookings, track incidents, and monitor campus safety from a
            single dashboard, built with Spring Boot & React.
          </p>

          <ul className="space-y-3 text-sm text-slate-200">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-400" />
              Real-time booking & incident overview
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-400" />
              Role-based dashboards for Admin, Students & Security
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-rose-400" />
              Clean, responsive UI powered by Tailwind CSS
            </li>
          </ul>
        </div>

        {/* Right panel – card */}
        <div className="w-full">
          <div className="mx-auto max-w-md rounded-2xl bg-white/95 p-6 shadow-2xl shadow-slate-900/40 backdrop-blur dark:bg-slate-900/95 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold">
                SC
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Smart Campus Login
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sign in to access your dashboard
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500/70 focus:bg-white focus:ring-2 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor="password"
                    className="block text-xs font-medium text-slate-600 dark:text-slate-300"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none ring-indigo-500/70 focus:bg-white focus:ring-2 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            <p className="mt-4 text-center text-[11px] text-slate-500">
              Use the credentials created from backend (register API / DB) to sign in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
