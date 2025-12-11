import React from "react";
import {
  Bars3Icon,
  BellIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../context/AuthContext";

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();
  const [dark, setDark] = React.useState(false);

  React.useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return (
    <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur dark:bg-slate-900/80 dark:border-slate-700">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
            onClick={onMenuClick}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Dashboard
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Smart Campus Resource & Safety
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200"
          >
            {dark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
          </button>

          <button className="relative rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-600 dark:text-slate-200">
            <BellIcon className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 inline-flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] text-white">
              3
            </span>
          </button>

          <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:bg-slate-800 dark:border-slate-600">
            <div className="h-7 w-7 rounded-full bg-indigo-500 text-xs font-semibold text-white flex items-center justify-center">
              {user?.fullName?.[0] || "U"}
            </div>
            <div className="text-xs">
              <p className="font-semibold text-slate-800 dark:text-slate-100">
                {user?.fullName || "User"}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {user?.role || ""}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
