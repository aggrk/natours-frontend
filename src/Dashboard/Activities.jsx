import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../utils/apiTours";
import Spinner from "../components/Spinner";

export default function Activities() {
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: getActivities,
  });

  return (
    <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
      <h2 className="mb-4 text-lg font-semibold text-[#2D6A4F] sm:text-xl">
        Recent Activity
      </h2>
      <div className="space-y-3">
        {isPending && <Spinner />}
        {activities?.data?.length === 0 ? (
          <p className="text-[#1B4332]">No activities yet!</p>
        ) : (
          activities?.data?.map(({ _id: id, action, timestamp }) => {
            const dateObj = new Date(timestamp);
            const date = dateObj.toISOString().split("T")[0];
            const time = dateObj.toTimeString().split(" ")[0];

            return (
              <div
                key={id}
                className="rounded-md bg-[#D8F3DC] p-3 text-sm text-[#1B4332] transition-all hover:bg-[#B7E4C7] sm:text-base"
              >
                {`${action} on ${date} ${time}`}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
