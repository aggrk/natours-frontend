import { useState } from "react";
import { motion } from "framer-motion";

export default function Bookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      tour: "Safari Adventure",
      date: "2025-04-15",
      status: "Upcoming",
      price: 299,
    },
    {
      id: 2,
      tour: "Mountain Hike",
      date: "2025-03-20",
      status: "Upcoming",
      price: 149,
    },
    {
      id: 3,
      tour: "City Tour",
      date: "2024-12-10",
      status: "Completed",
      price: 99,
    },
  ]);

  const handleCancel = (id) => {
    setBookings(
      bookings.map((b) =>
        b.id === id && b.status === "Upcoming"
          ? { ...b, status: "Cancelled" }
          : b,
      ),
    );
    alert("Booking cancelled!");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-[#2D6A4F] to-[#40916C] p-8 text-white shadow-lg"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10"></div>
          <h1 className="relative text-3xl font-extrabold tracking-tight">
            Your Bookings
          </h1>
          <p className="relative mt-1 text-sm opacity-80">
            Manage your upcoming trips and revisit past adventures
          </p>
        </motion.header>

        {/* Bookings List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {bookings.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center shadow-md">
              <p className="text-[#1B4332]">
                No bookings yet. Start exploring tours!
              </p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col items-start justify-between rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg md:flex-row md:items-center"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-[#2D6A4F]">
                    {booking.tour}
                  </h2>
                  <p className="text-sm text-[#1B4332]">
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p className="text-sm text-[#1B4332]">
                    <strong>Price:</strong> ${booking.price}
                  </p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                      booking.status === "Upcoming"
                        ? "bg-[#FFD166] text-[#1B4332]"
                        : booking.status === "Completed"
                          ? "bg-[#D8F3DC] text-[#40916C]"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
                <div className="mt-4 flex space-x-4 md:mt-0">
                  <button className="rounded-md bg-[#40916C] px-4 py-2 text-white transition-all hover:bg-[#2D6A4F]">
                    View Details
                  </button>
                  {booking.status === "Upcoming" && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      className="rounded-md bg-red-500 px-4 py-2 text-white transition-all hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}
