import React, { useEffect, useState } from "react";
import MainLayout from "../conponents/layout/MainLayout";
import BookingForm from "../conponents/bookings/BookingForm";
import { useAuth } from "../context/AuthContext";
import { getUserBookings } from "../services/bookingService";

export default function StudentBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    setLoading(true);
    try {
      const data = await getUserBookings(user.userId);
      setBookings(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.userId) {
      loadBookings();
    }
  }, [user]);

  const statusClass = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-100 text-emerald-700";
      case "PENDING":
        return "bg-amber-100 text-amber-700";
      case "CANCELLED":
        return "bg-rose-100 text-rose-700";
      case "COMPLETED":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <MainLayout>
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          My Bookings
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Book labs, seminar halls and equipment, and track your upcoming slots.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr,1.3fr]">
        <BookingForm onBooked={loadBookings} />

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
            <p className="text-xs text-slate-500">
              No bookings yet. Create your first booking using the form.
            </p>
          )}

          <div className="space-y-2 max-h-[420px] overflow-y-auto">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs dark:bg-slate-800 dark:border-slate-700"
              >
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100">
                    {b.resource?.name || "Resource"}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {b.bookingDate} • {b.startTime} – {b.endTime}
                  </p>
                  {b.purpose && (
                    <p className="mt-0.5 text-[11px] text-slate-500">
                      {b.purpose}
                    </p>
                  )}
                </div>
                <span
                  className={
                    "rounded-full px-2 py-1 text-[10px] font-semibold " +
                    statusClass(b.status)
                  }
                >
                  {b.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
