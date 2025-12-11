import React from "react";
import MainLayout from "../conponents/layout/MainLayout";
import StatCard from "../conponents/common/StatCard";
import { FiUsers, FiCalendar, FiAlertTriangle } from "react-icons/fi";

export default function Dashboard() {
  // Ye values abhi static hain, baad me backend se aa sakti hain
  const stats = [
    {
      label: "Total Resources",
      value: 12,
      change: 8,            // % change (optional)
      icon: FiCalendar,     // icon component
      color: "indigo",
    },
    {
      label: "Active Bookings",
      value: 5,
      change: 15,
      icon: FiUsers,
      color: "emerald",
    },
    {
      label: "Open Incidents",
      value: 2,
      change: -4,
      icon: FiAlertTriangle,
      color: "rose",
    },
  ];

  return (
    <MainLayout>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Overview
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Quick summary of resources, bookings and incidents.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </MainLayout>
  );
}
