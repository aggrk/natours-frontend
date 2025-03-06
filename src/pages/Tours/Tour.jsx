import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaCalendar, FaFlag, FaUser, FaLocationDot } from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  createFavorite,
  getFavorites,
  removeFavorite,
} from "../../utils/apiTours";
import toast from "react-hot-toast";

export default function Tour({ item }) {
  const queryClient = useQueryClient();

  const { data: favorites, isPending: isFavoritesLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  // Check if current tour is favorited
  const isFavorited = favorites?.data?.some((fav) => fav.tour._id === item._id);

  // Add to favorites mutation
  const addMutation = useMutation({
    mutationFn: createFavorite,
    onSuccess: () => {
      toast.success("Tour added to favorites");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: (err) =>
      toast.error(err.message || "Could not add tour to favorites"),
  });

  // Remove from favorites mutation
  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      toast.success("Tour removed from favorites");
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
    onError: (err) =>
      toast.error(err.message || "Could not remove tour from favorites"),
  });

  const handleFavourite = () => {
    if (isFavorited) {
      // Find the favorite entry to get its ID
      const favoriteEntry = favorites.data.find(
        (fav) => fav.tour._id === item._id,
      );
      if (favoriteEntry) {
        removeMutation.mutate(favoriteEntry._id);
      }
    } else {
      addMutation.mutate({ tour: item._id });
    }
  };

  // Combined loading state
  const isProcessing = addMutation.isPending || removeMutation.isPending;

  return (
    <div className="flex h-[550px] max-w-sm transform flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105">
      <img
        src={`https://natours-api-chd9.onrender.com/img/tours/${item.imageCover}`}
        alt="tour"
        className="h-48 w-full object-cover"
      />

      <div className="flex-grow p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#2D6A4F]">{item.name}</h3>
          <button
            onClick={handleFavourite}
            disabled={isProcessing || isFavoritesLoading}
            className="cursor-pointer text-2xl transition-colors focus:outline-none disabled:opacity-50"
            aria-label={
              isFavorited ? "Remove from favourites" : "Add to favourites"
            }
          >
            {isFavorited ? (
              <FaHeart className="text-[#FF6B6B] hover:text-[#FF8787]" />
            ) : (
              <FaRegHeart className="text-[#1B4332] hover:text-[#40916C]" />
            )}
          </button>
        </div>
        <p className="mt-4 text-lg italic text-gray-700">{item.summary}</p>

        <div className="mt-4 grid grid-cols-2 gap-6">
          <p className="flex items-center text-sm text-gray-600">
            <span className="mr-2 text-lg text-[#1B4332]">
              <FaLocationDot />
            </span>
            {item.startLocation.description}
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <span className="mr-2 text-lg text-[#1B4332]">
              <FaCalendar />
            </span>
            Date
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <span className="mr-2 text-lg text-[#1B4332]">
              <FaFlag />
            </span>
            {item.locations.length} stops
          </p>
          <p className="flex items-center text-sm text-gray-600">
            <span className="mr-2 text-lg text-[#1B4332]">
              <FaUser />
            </span>
            {item.maxGroupSize} people
          </p>
        </div>
      </div>

      <div className="flex h-20 w-full items-center justify-between bg-[#D8F3DC] px-6 py-2">
        <div>
          <p className="text-lg font-semibold text-gray-800">
            ${item.price} per person
          </p>
          <p className="pt-[4px] text-gray-600">
            ⭐ {item.ratingsAverage} ({item.ratingsQuantity})
          </p>
        </div>
        <NavLink
          to={`tours/${item._id}`}
          className="cursor-pointer rounded-full bg-[#FFD166] px-6 py-2 text-black transition hover:bg-yellow-500"
        >
          Details
        </NavLink>
      </div>
    </div>
  );
}
