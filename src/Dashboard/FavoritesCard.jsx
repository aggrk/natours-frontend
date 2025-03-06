import Spinner from "../components/Spinner";

export default function FavoriteCard({ favorites, isPending }) {
  return (
    <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#2D6A4F] sm:text-xl">
        Favourite Tours
      </h2>
      <div className="space-y-3">
        {isPending && <Spinner />}
        {favorites?.data?.length === 0 ? (
          <p className="text-[#1B4332]">No favourite tours yet. Add some!</p>
        ) : (
          favorites?.data.map((item) => (
            <div
              key={item.tour._id}
              className="rounded-md bg-[#D8F3DC] p-3 transition-all hover:bg-[#B7E4C7]"
            >
              <h3 className="text-sm font-medium text-[#1B4332] sm:text-base">
                {item.tour.name}
              </h3>
              <p className="text-xs text-[#40916C] sm:text-sm">
                {item.tour.bookings} bookings
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
