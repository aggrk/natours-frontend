import { useContext, useState } from "react";
import {
  FaUserCircle,
  FaGlobeAmericas,
  FaRegCalendarAlt,
  FaInbox,
  FaPowerOff,
  FaSearch,
} from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import SidebarLink from "./SidebarLink";
import { Outlet, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/apiTours";
import { AuthContext } from "../context/AuthContext";

export default function Layout({ user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await logoutUser();
      if (res.status === "success") {
        setIsAuth(false);
        navigate("/signin");
        setIsSidebarOpen(false);
      }
      return res;
    } catch (err) {
      console.log(err);
    }
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
            <img
              src={`http://127.0.0.1:3000/img/users/${user.data.data.photo}`}
              alt="User Profile"
              className="h-[60px] w-[60px] rounded-full md:h-[80px] md:w-[80px]"
            />
            <p className="pl-4 text-lg font-bold text-[#1B4332] md:text-xl">
              {user?.data?.data.name}
            </p>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-4">
            <SidebarLink to="profile" Icon={FaUserCircle} label="Profile" />
            <SidebarLink to="tours" Icon={FaGlobeAmericas} label="Tours" />
            <SidebarLink
              to="bookings"
              Icon={FaRegCalendarAlt}
              label="Bookings"
            />
            <SidebarLink to="inbox" Icon={FaInbox} label="Inbox" />
            <SidebarLink to="settings" Icon={IoMdSettings} label="Settings" />
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
