import { useState } from "react";
import {
  FaUserCircle,
  FaGlobeAmericas,
  FaRegCalendarAlt,
  FaInbox,
  FaPowerOff,
  FaSearch,
  FaHeart,
} from "react-icons/fa";
import SidebarLink from "./SidebarLink";
import { Outlet } from "react-router-dom";
import { updateUser } from "../utils/apiTours";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useLogout from "../utils/useLogout";
import { URL } from "../utils/urls";

export default function Layout({ user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const handleLogout = useLogout();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (formData) => updateUser(formData),
    onSuccess: () => {
      toast.success("Photo uploaded successfully");
      queryClient.invalidateQueries(["user"]);
      setIsUploading(false);
      setSelectedFile(null);
      reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to upload photo");
      setIsUploading(false);
    },
  });

  function onSubmit(data) {
    if (!data.photo || !data.photo[0]) {
      toast.error("Please select a photo to upload");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("photo", data.photo[0]);

    mutation.mutate(formData);
  }

  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-20 h-screen w-[280px] border-r border-[#B7E4C7] bg-[#D8F3DC] shadow-lg transition-transform duration-300 md:w-[380px] md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 p-6">
          {/* User Profile */}
          <div className="flex items-center">
            <div className="group relative">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* File Input */}
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  className="hidden"
                  disabled={isUploading}
                  {...register("photo", {
                    onChange: (e) => {
                      const file = e.target.files?.[0];
                      setSelectedFile(file);
                    },
                  })}
                />
                <div className="flex items-center gap-2">
                  {/* Profile Image */}
                  <label
                    htmlFor="profilePhoto"
                    className={`relative cursor-pointer transition-transform duration-200 hover:scale-105 ${
                      isUploading ? "opacity-50" : ""
                    }`}
                    title={
                      isUploading ? "Uploading..." : "Change profile photo"
                    }
                  >
                    <img
                      src={`${URL}/users/${user.data.data.photo}`}
                      alt="User Profile"
                      className="h-[60px] w-[60px] rounded-full border-2 border-gray-200 shadow-lg transition-all duration-300 hover:border-[#1B4332] hover:shadow-md md:h-[80px] md:w-[80px]"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-all duration-300 group-hover:opacity-100">
                      <span className="text-xl text-white">
                        {isUploading ? "⏳" : "📷"}
                      </span>
                    </div>
                  </label>

                  {/* Upload Button (Conditional Rendering) */}
                  {selectedFile && (
                    <button
                      type="submit"
                      disabled={isUploading}
                      className={`flex cursor-pointer items-center gap-2 rounded-full bg-[#1B4332] px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-[#2d6652] hover:shadow-md ${
                        isUploading ? "cursor-not-allowed opacity-50" : ""
                      }`}
                    >
                      {isUploading ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <span>Upload</span>
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
            <p className="pl-4 text-lg font-bold text-[#1B4332] md:text-xl">
              {user?.data?.data.name}
            </p>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-4">
            <SidebarLink
              to="profile"
              Icon={FaUserCircle}
              label="Profile"
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <SidebarLink
              to="tours"
              Icon={FaGlobeAmericas}
              label="Tours"
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <SidebarLink
              to="bookings"
              Icon={FaRegCalendarAlt}
              label="Bookings"
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <SidebarLink
              to="inbox"
              Icon={FaInbox}
              label="Inbox"
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <SidebarLink
              to="favorite"
              Icon={FaHeart}
              label="Favorites"
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <li
              onClick={handleLogout}
              className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#B7E4C7]"
            >
              <FaPowerOff className="h-[25px] w-[25px] text-[#1B4332]" />
              <span className="text-lg text-gray-600">Logout</span>
            </li>
          </ul>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:ml-[380px]">
        {/* Header */}
        <header className="fixed top-0 z-10 flex h-[80px] w-full items-center justify-between border-b border-[#B7E4C7] bg-[#D8F3DC] shadow md:left-[380px]">
          {/* Sidebar Toggle Button (Mobile) */}
          <button
            className="ml-4 cursor-pointer md:hidden"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
          <FaSearch className="ml-4 mr-4 text-xl text-[#1B4332]" />
        </header>

        {/* Main Content Area */}
        <main className="mt-[80px] flex-1 overflow-y-auto bg-gray-100 p-4 md:h-[calc(100vh-80px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
