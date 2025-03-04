import { useQueries } from "@tanstack/react-query";
import { useState } from "react";
import { fetchUser, getFavorites } from "../utils/apiTours";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const results = useQueries({
    queries: [
      { queryKey: ["user"], queryFn: fetchUser },
      { queryKey: ["favorites"], queryFn: getFavorites },
    ],
  });

  const [user, favorites] = results.map((result) => result.data);
  const { name, email } = user?.data?.data || {};

  const handleEditProfile = () => setIsEditing(true);
  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile logic here
  };
  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      alert("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {" "}
        {/* Changed from max-w-5xl to max-w-7xl */}
        {/* Header */}
        <header className="relative mb-6 rounded-xl bg-gradient-to-r from-[#2D6A4F] to-[#40916C] p-6 text-white shadow-lg sm:p-8">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10"></div>
          <h1 className="relative text-2xl font-extrabold tracking-tight sm:text-3xl">
            Your Profile
          </h1>
          <p className="relative mt-1 text-sm opacity-80 sm:text-base">
            Manage your account and explore your adventures
          </p>
        </header>
        {/* Profile Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Statistics Card */}
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

            {/* Edit Profile Card */}
            <section className="rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg sm:p-6">
              <h2 className="mb-4 text-lg font-semibold text-[#2D6A4F] sm:text-xl">
                Edit Profile
              </h2>
              {isEditing ? (
                <div className="space-y-4">
                  {["name", "email"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium capitalize text-[#1B4332]">
                        {field}
                      </label>
                      <input
                        type={field === "email" ? "email" : "text"}
                        defaultValue={user?.data?.data[field] || ""}
                        className="mt-1 w-full rounded-md border-gray-300 p-2 text-sm shadow-sm focus:border-[#40916C] focus:ring-[#40916C] sm:text-base"
                      />
                    </div>
                  ))}
                  <button
                    onClick={handleSaveProfile}
                    className="w-full rounded-md bg-[#40916C] px-4 py-2 text-sm text-white transition-all hover:bg-[#2D6A4F] sm:w-auto sm:text-base"
                  >
                    Save Profile
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-[#1B4332] sm:text-base">
                    <strong>Name:</strong> {name || "N/A"}
                  </p>
                  <p className="text-sm text-[#1B4332] sm:text-base">
                    <strong>Email:</strong> {email || "N/A"}
                  </p>
                  <button
                    onClick={handleEditProfile}
                    className="w-full rounded-md bg-[#FFD166] px-4 py-2 text-sm text-[#1B4332] transition-all hover:bg-[#FFC107] sm:w-auto sm:text-base"
                  >
                    Edit Profile
                  </button>
                </div>
              )}
            </section>

            {/* Change Password Card */}
            <section className="rounded-xl bg-white p-4 shadow-md transition-all hover:shadow-lg sm:p-6">
              <h2 className="mb-4 text-lg font-semibold text-[#2D6A4F] sm:text-xl">
                Change Password
              </h2>
              <div className="space-y-4">
                {[
                  {
                    label: "Current Password",
                    value: currentPassword,
                    setter: setCurrentPassword,
                  },
                  {
                    label: "New Password",
                    value: newPassword,
                    setter: setNewPassword,
                  },
                  {
                    label: "Confirm New Password",
                    value: confirmPassword,
                    setter: setConfirmPassword,
                  },
                ].map(({ label, value, setter }) => (
                  <div key={label}>
                    <label className="block text-sm font-medium text-[#1B4332]">
                      {label}
                    </label>
                    <input
                      type="password"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 p-2 text-sm shadow-sm focus:border-[#40916C] focus:ring-[#40916C] sm:text-base"
                    />
                  </div>
                ))}
                <button
                  onClick={handleChangePassword}
                  className="w-full rounded-md bg-[#40916C] px-4 py-2 text-sm text-white transition-all hover:bg-[#2D6A4F] sm:w-auto sm:text-base"
                >
                  Change Password
                </button>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Favourite Tours */}
            <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
              <h2 className="mb-4 text-lg font-semibold text-[#2D6A4F] sm:text-xl">
                Favourite Tours
              </h2>
              <div className="space-y-3">
                {favorites?.data.map((item) => (
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
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="rounded-xl bg-white p-4 shadow-md sm:p-6">
              <h2 className="mb-4 text-lg font-semibold text-[#2D6A4F] sm:text-xl">
                Recent Activity
              </h2>
              <div className="space-y-3">
                {[
                  "Booked Safari Adventure on 10/12/2023",
                  "Added Mountain Hike to favourites on 09/12/2023",
                  "Reviewed City Tour on 08/12/2023",
                ].map((activity) => (
                  <div
                    key={activity}
                    className="rounded-md bg-[#D8F3DC] p-3 text-sm text-[#1B4332] transition-all hover:bg-[#B7E4C7] sm:text-base"
                  >
                    {activity}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
