import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createBooking } from "../../services/bookingService";
import { getAvailableResources } from "../../services/resourceService";

export default function BookingForm({ onBooked }) {
  const { user } = useAuth();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const [form, setForm] = useState({
    resourceId: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const data = await getAvailableResources();
      setResources(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);
    try {
      await createBooking(user.userId, {
        resourceId: Number(form.resourceId),
        bookingDate: form.bookingDate,
        startTime: form.startTime,
        endTime: form.endTime,
        purpose: form.purpose,
      });
      setMsg({ type: "success", text: "Booking created successfully." });
      setForm({
        resourceId: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        purpose: "",
      });
      onBooked && onBooked();
    } catch (err) {
      const text =
        err.response?.data?.message ||
        "Booking failed. Resource may already be booked in this slot.";
      setMsg({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
        Book a Resource
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Resource
            </label>
            <select
              name="resourceId"
              value={form.resourceId}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
            >
              <option value="">Select resource</option>
              {resources.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.location}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Date
            </label>
            <input
              type="date"
              name="bookingDate"
              min={today}
              value={form.bookingDate}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
              Start time
            </label>
            <input
              type="time"
              name="startTime"
              value={form.startTime}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
              End time
            </label>
            <input
              type="time"
              name="endTime"
              value={form.endTime}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
            />
          </div>
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-300">
            Purpose
          </label>
          <input
            type="text"
            name="purpose"
            value={form.purpose}
            onChange={handleChange}
            placeholder="Lab practice, seminar, project work..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/70 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100"
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
          className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Creating booking..." : "Create booking"}
        </button>
      </form>
    </div>
  );
}
