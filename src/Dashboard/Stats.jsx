export default function Stats({ favorites }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#2D6A4F] sm:text-xl">
        Your Stats
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { title: "Total Bookings", value: 127, bg: "bg-[#40916C]" },
          {
            title: "Favourite Tours",
            value: favorites?.data?.length || 0,
            bg: "bg-[#FFD166]",
            text: "text-[#1B4332]",
          },
          { title: "Upcoming Trips", value: 3, bg: "bg-[#1B4332]" },
        ].map((stat) => (
          <div
            key={stat.title}
            className={`rounded-lg p-3 text-center text-white ${stat.bg} ${stat.text || ""} transition-transform hover:scale-105`}
          >
            <h3 className="text-sm font-semibold">{stat.title}</h3>
            <p className="text-lg font-bold sm:text-xl">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
