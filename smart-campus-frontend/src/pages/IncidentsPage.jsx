import React, { useEffect, useState } from "react";
import MainLayout from "../conponents/layout/MainLayout";
import IncidentForm from "../conponents/incidents/IncidentForm";
import { getOpenIncidents } from "../services/incidentService";
import { useAuth } from "../context/AuthContext";

export default function IncidentsPage() {
  const { user } = useAuth();
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadIncidents = async () => {
    setLoading(true);
    try {
      const data = await getOpenIncidents();
      setIncidents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const severityClass = (sev) => {
    switch (sev) {
      case "CRITICAL":
        return "bg-rose-100 text-rose-700";
      case "HIGH":
        return "bg-amber-100 text-amber-700";
      case "MEDIUM":
        return "bg-sky-100 text-sky-700";
      case "LOW":
        return "bg-emerald-100 text-emerald-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <MainLayout>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Incidents
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Report new incidents and monitor open safety issues on campus.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr,1.4fr]">
        {/* Left: form (all roles allowed) */}
        <IncidentForm onReported={loadIncidents} />

        {/* Right: list */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
              Open incidents
            </h2>
            {loading && (
              <span className="text-[11px] text-slate-500">Loading…</span>
            )}
          </div>

          {incidents.length === 0 && !loading && (
            <p className="text-xs text-slate-500">
              No open incidents right now.
            </p>
          )}

          <div className="space-y-2 max-h-[420px] overflow-y-auto">
            {incidents.map((inc) => (
              <div
                key={inc.id}
                className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs dark:bg-slate-800 dark:border-slate-700"
              >
                <div className="pr-2">
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {inc.incidentType} incident
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {inc.location || "Location not specified"}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
                    {inc.description}
                  </p>
                  {inc.createdAt && (
                    <p className="mt-1 text-[10px] text-slate-400">
                      Reported at: {inc.createdAt}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={
                      "rounded-full px-2 py-1 text-[10px] font-semibold " +
                      severityClass(inc.severity)
                    }
                  >
                    {inc.severity}
                  </span>
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-semibold text-amber-700">
                    {inc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
