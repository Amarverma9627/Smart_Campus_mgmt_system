import React from "react";

const colorMap = {
  indigo: "from-indigo-500/90 to-indigo-500/60",
  emerald: "from-emerald-500/90 to-emerald-500/60",
  rose: "from-rose-500/90 to-rose-500/60",
};

export default function StatCard({ label, value, color = "indigo" }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div
        className={`h-1 w-full bg-gradient-to-r ${colorMap[color] || colorMap.indigo}`}
      />
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          {value}
        </p>
      </div>
    </div>
  );
}
