import React from "react";
import Badge from "../common/Badge";

const statusClass = (status) => {
  switch (status) {
    case "CONFIRMED":
      return "green";
    case "PENDING":
      return "yellow";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};

export default function BookingList({ bookings, loading, onEdit }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
          Recent bookings
        </h2>
        {loading && (
          <span className="text-[11px] text-slate-500">Loading…</span>
        )}
      </div>

      {bookings.length === 0 && !loading && (
        <p className="text-xs text-slate-500">No bookings found.</p>
      )}

      <div className="max-h-[420px] space-y-2 overflow-y-auto">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="flex items-start justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800"
          >
            <div className="pr-2">
              <p className="font-semibold text-slate-800 dark:text-slate-100">
                {b.resourceName || "Room / Facility"}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                By: {b.bookedByName || "Unknown user"}
              </p>
              <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-300">
                {b.startTime} → {b.endTime}
              </p>
              {b.notes && (
                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {b.notes}
                </p>
              )}
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-1">
                {b.amount && (
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                    ₹{b.amount}
                  </span>
                )}

                {/* yaha Badge use kiya */}
                <Badge color={statusClass(b.status)}>
                  {b.status}
                </Badge>
              </div>

              <button
                type="button"
                onClick={() => onEdit && onEdit(b)}
                className="rounded-lg border border-slate-300 px-2 py-1 text-[10px] font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
