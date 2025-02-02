import { useQuery } from "@tanstack/react-query";
import { getDocs } from "../../utils/apiTours";
import Tour from "./Tour";

export default function Tours() {
  const {
    isPending,
    data: tours,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: getDocs,
  });

  if (isPending)
    return (
      <p className="text-center text-lg font-semibold">Loading tours...</p>
    );

  return (
    <section className="bg-[#D8F3DC] py-12">
      <div className="container mx-auto px-6">
        <h2 className="mb-8 text-center text-3xl font-bold text-[#1B4332]">
          Our Tours
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {tours.data.data.map((tour) => (
            <Tour key={tour.id} item={tour} />
          ))}
          <p>Explore more tours</p>
        </div>
      </div>
    </section>
  );
}
