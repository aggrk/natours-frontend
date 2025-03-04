import { motion } from "framer-motion"; // Optional: npm install framer-motion
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavorites, removeFavorite } from "../utils/apiTours";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const URL = "http://127.0.0.1:3000/img/tours";

export default function Favourite() {
  const queryClient = useQueryClient();
  const { data: favorites, isPending } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });
  console.log(favorites);
  const mutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      toast.success("Tour removed successfully");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
    onError: (err) =>
      toast.error(err.message || "Unable to remove tour from favorites"),
  });

  const handleRemove = (id) => {
    mutation.mutate(id);
  };

  if (isPending) return <Spinner />;

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
            Favourite Tours
          </h1>
          <p className="relative mt-1 text-sm opacity-80">
            Your saved adventures, ready to book
          </p>
        </motion.header>

        {/* Tours Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {favorites?.data?.length === 0 ? (
            <div className="col-span-full rounded-xl bg-white p-6 text-center shadow-md">
              <p className="text-[#1B4332]">
                No favourite tours yet. Add some!
              </p>
            </div>
          ) : (
            favorites?.data?.map((item) => (
              <div
                key={item.tour.id}
                className="overflow-hidden rounded-xl bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={`${URL}/${item.tour.imageCover}`}
                  alt={item.tour.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-[#2D6A4F]">
                    {item.tour.name}
                  </h2>
                  <p className="text-sm text-[#1B4332]">
                    <strong>Location:</strong>{" "}
                    {item.tour.startLocation.description}
                  </p>
                  <p className="text-sm text-[#1B4332]">
                    <strong>Duration:</strong> {item.tour.duration}
                  </p>
                  <p className="text-sm text-[#1B4332]">
                    <strong>Price:</strong> ${item.tour.price}
                  </p>
                  <div className="mt-4 flex space-x-4">
                    <button className="cursor-pointer rounded-md bg-[#40916C] px-4 py-2 text-white transition-all hover:bg-[#2D6A4F]">
                      Book Now
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="cursor-pointer rounded-md bg-gray-200 px-4 py-2 text-[#1B4332] transition-all hover:bg-gray-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  );
}

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { updateUser } from "../utils/apiTours";
// import toast from "react-hot-toast";

// export default function Settings() {
//   const { register, handleSubmit } = useForm();
//   const queryClient = useQueryClient();
//   const mutation = useMutation({
//     mutationFn: updateUser,
//     onSuccess: () => {
//       toast.success("Photo uploaded successfully");
//       queryClient.invalidateQueries(["user"]);
//     },
//     onError: (err) => toast.error(err.message),
//   });

//   function onSubmit(data) {
//     const formData = new FormData();
//     if (data.photo[0]) {
//       formData.append("photo", data.photo[0]);
//     }

//     mutation.mutate(formData);
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input
//         type="file"
//         id="upload"
//         {...register("photo")}
//         accept="image/*"
//         className="cursor-pointer border-2 border-gray-950 px-8 py-4"
//       />
//       <button className="ml-4 cursor-pointer bg-gray-950 px-5 py-4 text-white">
//         Upload
//       </button>
//     </form>
//   );
// }
