import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { reportIncident } from "../../services/incidentService";

const typeOptions = ["FIRE", "MEDICAL", "SECURITY", "ACCIDENT", "OTHER"];
const severityOptions = ["CRITICAL", "HIGH", "MEDIUM", "LOW"];

export default function IncidentForm({ onReported }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    incidentType: "SECURITY",
    severity: "MEDIUM",
    location: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);
    try {
      await reportIncident(user.userId, form);
      setMsg({ type: "success", text: "Incident reported successfully." });
      setForm({
        incidentType: "SECURITY",
        severity: "MEDIUM",
        location: "",
        description: "",
      });
      onReported && onReported();
    } catch (err) {
      const text =
        err.response?.data?.message || "Failed to report incident.";
      setMsg({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
        Report an Incident
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Incident type
            </label>
            <select
              name="incidentType"
              value={form.incidentType}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
            >
              {typeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Severity
            </label>
            <select
              name="severity"
              value={form.severity}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
            >
              {severityOptions.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
            Location
          </label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Block A - 2nd floor, Parking, Main gate..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            required
            placeholder="Briefly describe what happened..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
          />
        </div>

        {msg.text && (
          <div
            className={`rounded-lg px-3 py-2 text-xs ${
              msg.type === "success"
                ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border border-rose-200 bg-rose-50 text-rose-700"
            }`}
          >
            {msg.text}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit incident"}
        </button>
      </form>
    </div>
  );
}
