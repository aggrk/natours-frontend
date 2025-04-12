import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  FaCalendar,
  FaFlag,
  FaUser,
  FaLocationDot,
  FaStar,
} from "react-icons/fa6";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  createFavorite,
  getFavorites,
  removeFavorite,
} from "../../utils/apiTours";
import toast from "react-hot-toast";
import { URL } from "../../utils/urls";

export default function Tour({ item }) {
  const queryClient = useQueryClient();

  const { data: favorites, isPending: isFavoritesLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  // Checking if current tour is favorited
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

  const isProcessing = addMutation.isPending || removeMutation.isPending;

  return (
    <div className="flex h-full max-w-7xl flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:hover:-translate-y-1.5">
      {/* Image Section with Aspect Ratio */}
      <div className="relative aspect-[4/3]">
        <img
          src={`${URL}/tours/${item.imageCover}`}
          alt={item.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* Favorite Button */}
        <button
          onClick={handleFavourite}
          disabled={isProcessing || isFavoritesLoading}
          className="absolute right-3 top-3 cursor-pointer rounded-full bg-white/80 p-2 backdrop-blur-sm transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/50 disabled:opacity-50"
          aria-label={
            isFavorited ? "Remove from favourites" : "Add to favourites"
          }
        >
          {isFavorited ? (
            <FaHeart className="text-xl text-[#FF6B6B]" />
          ) : (
            <FaRegHeart className="text-xl text-[#1B4332]" />
          )}
        </button>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="mb-2 text-lg font-bold text-[#1B4332] sm:mb-3 sm:text-xl">
          {item.name}
        </h3>
        <p className="mb-3 line-clamp-3 text-sm text-gray-600 sm:mb-4 sm:text-base">
          {item.summary}
        </p>

        {/* Tour Details Grid */}
        <div className="mt-auto grid grid-cols-2 gap-3 text-xs sm:text-sm">
          <div className="flex items-start">
            <FaLocationDot className="mr-1.5 mt-0.5 text-[#40916C] sm:mr-2" />
            <span>{item.startLocation.description}</span>
          </div>
          <div className="flex items-start">
            <FaCalendar className="mr-1.5 mt-0.5 text-[#40916C] sm:mr-2" />
            <span>Date</span>
          </div>
          <div className="flex items-start">
            <FaFlag className="mr-1.5 mt-0.5 text-[#40916C] sm:mr-2" />
            <span>{item.locations.length} stops</span>
          </div>
          <div className="flex items-start">
            <FaUser className="mr-1.5 mt-0.5 text-[#40916C] sm:mr-2" />
            <span>{item.maxGroupSize} people</span>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between border-t border-gray-100 bg-[#D8F3DC]/50 px-4 py-3 sm:px-5 sm:py-4">
        <div>
          <p className="text-sm font-semibold text-[#1B4332] sm:text-base">
            ${item.price}
            <span className="ml-1 text-xs text-gray-600 sm:text-sm">
              per person
            </span>
          </p>
          <div className="flex items-center text-xs text-gray-600 sm:text-sm">
            <FaStar className="mr-1 text-amber-400" />
            {item.ratingsAverage} <span className="mx-1">·</span> (
            {item.ratingsQuantity})
          </div>
        </div>
        <NavLink
          to={`tours/${item._id}`}
          className="rounded-lg bg-gradient-to-r from-[#FFD166] to-[#FFB700] px-3 py-1.5 text-xs font-medium text-gray-900 transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#FFB700]/50 sm:px-4 sm:py-2 sm:text-sm"
        >
          Details
        </NavLink>
      </div>
    </div>
  );
}
