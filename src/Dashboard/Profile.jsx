import { useQuery } from "@tanstack/react-query";
import { getFavorites } from "../utils/apiTours";
import ChangePassword from "./ChangePassword";
import Activities from "./Activities";
import ProfileHeader from "./ProfileHeader";
import Stats from "./Stats";
import EditProfile from "./EditProfile";
import FavoritesCard from "./FavoritesCard";

export default function Profile() {
  const { data: favorites, isPending } = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <ProfileHeader />
        {/* Profile Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Statistics Card */}
            <Stats favorites={favorites} />

            {/* Edit Profile Card */}
            <EditProfile />
            {/* Change Password */}
            <ChangePassword />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Favourite Tours */}
            <FavoritesCard favorites={favorites} isPending={isPending} />

            {/* Recent Activity */}
            <Activities />
          </div>
        </div>
      </div>
    </div>
  );
}
