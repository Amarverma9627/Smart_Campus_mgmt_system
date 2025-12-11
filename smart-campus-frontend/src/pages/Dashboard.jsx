
import React from "react";
import MainLayout from "../components/layout/MainLayout";
import StatCard from "../components/common/StatCard";

export default function Dashboard() {
  // Placeholder stats – baad me backend se connect karenge
  const stats = [
    { label: "Total Resources", value: 12, color: "indigo" },
    { label: "Active Bookings", value: 5, color: "emerald" },
    { label: "Open Incidents", value: 2, color: "rose" },
  ];

  return (
    <MainLayout>
      <h1 className="mb-4 text-xl font-semibold">Overview</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </MainLayout>
  );
}
