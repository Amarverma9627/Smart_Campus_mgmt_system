import React from "react";
import {
  HomeIcon,
  CalendarDaysIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  BanknotesIcon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: HomeIcon },
  { to: "/student/bookings", label: "Bookings", icon: CalendarDaysIcon },
  { to: "/admin/resources", label: "Resources", icon: BanknotesIcon },
  { to: "/incidents", label: "Incidents", icon: ShieldCheckIcon },
];

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 transform bg-slate-900 text-slate-100 shadow-xl transition-transform duration-200
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex h-16 items-center gap-2 px-4 border-b border-slate-700">
          <div className="h-9 w-9 rounded-xl bg-indigo-500 flex items-center justify-center text-white font-bold">
            SC
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide">
              Smart Campus
            </p>
            <p className="text-xs text-slate-400">Resource & Safety</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col h-[calc(100%-4rem)]">
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              // simple role filter: bookings page only for STUDENT, resources only for ADMIN
              if (
                item.to === "/student/bookings" &&
                user?.role !== "STUDENT"
              ) {
                return null;
              }
              if (
                item.to === "/admin/resources" &&
                user?.role !== "ADMIN"
              ) {
                return null;
              }

              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-slate-800 text-white"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="border-t border-slate-700 px-3 py-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold">
                {user?.fullName?.[0] || "U"}
              </div>
              <div>
                <p className="text-xs font-semibold leading-tight">
                  {user?.fullName || "User"}
                </p>
                <p className="text-[11px] text-slate-400">
                  {user?.role || ""}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
