import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="max-w-md text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-400">
          Error 404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-50 sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          The page you are looking for does not exist or was moved. Check the URL or go back to the dashboard.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            Go to dashboard
          </Link>
          <button
            type="button"
            onClick={() => window.history.back()}
            className="text-sm font-medium text-slate-400 hover:text-slate-200"
          >
            Go back
          </button>
        </div>

        <p className="mt-6 text-[11px] text-slate-500">
          If this keeps happening, contact the administrator.
        </p>
      </div>
    </div>
  );
}
