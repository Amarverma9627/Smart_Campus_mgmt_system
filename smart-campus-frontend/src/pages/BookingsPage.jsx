import React, { useEffect, useState } from "react";
import MainLayout from "../conponents/layout/MainLayout";
import BookingList from "../conponents/bookings/BookingList";
import { getAllBookings } from "../services/bookingService";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    // 1) Yaha function define karo
    const handleEditBooking = (booking) => {
        // yaha pe modal open karo / form me data set karo
        console.log("edit booking", booking);
        // example: setSelectedBooking(booking); setIsEditOpen(true);
    };
    const loadBookings = async () => {
        setLoading(true);
        try {
            const data = await getAllBookings();
            setBookings(data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBookings();
    }, []);

    return (
        <MainLayout>
            <div className="mb-4">
                <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Bookings
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                    View all recent room and facility bookings.
                </p>
            </div>

            <BookingList
                bookings={bookings}
                loading={loading}
                onEdit={handleEditBooking}
            />
        </MainLayout>
    );
}
