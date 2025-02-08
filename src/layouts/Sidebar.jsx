import { FaRegCalendarAlt } from "react-icons/fa";
import { FaGlobeAmericas } from "react-icons/fa";
import { FaInbox } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { logoutUser } from "../utils/apiTours";
import { IoMdSettings } from "react-icons/io";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar({ user }) {
  const { setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const res = await logoutUser();
      if (res.status === "success") {
        setIsAuth(false);
        navigate("/signin");
      }
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <aside className="fixed hidden h-screen w-[380px] border-r border-[#D8F3DC] bg-[#D8F3DC] shadow md:block">
      <div className="flex flex-col gap-6 p-8">
        {/* User Profile Section */}
        <div className="flex items-center">
          <img
            src="/img/users/default.jpg"
            alt="User Profile"
            className="h-[80px] w-[80px] rounded-full"
          />
          <p className="pl-5 text-xl font-bold text-[#1B4332]">
            {user?.data?.data.name}
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-4">
          <li className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#B7E4C7]">
            <FaUserCircle className="h-[30px] w-[25px] text-[#1B4332]" />
            <NavLink to="profile" className="text-xl text-gray-600">
              Profile
            </NavLink>
          </li>
          <li className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#B7E4C7]">
            <FaGlobeAmericas className="h-[30px] w-[25px] text-[#1B4332]" />
            <NavLink to="tours" className="text-xl text-gray-600">
              Tours
            </NavLink>
          </li>
          <li className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#B7E4C7]">
            <FaRegCalendarAlt className="h-[30px] w-[25px] text-[#1B4332]" />
            <NavLink to="bookings" className="text-xl text-gray-600">
              Bookings
            </NavLink>
          </li>
          <li className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#B7E4C7]">
            <FaInbox className="h-[30px] w-[25px] text-[#1B4332]" />
            <NavLink to="inbox" className="text-xl text-gray-600">
              Inbox
            </NavLink>
          </li>
          <li className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#B7E4C7]">
            <IoMdSettings className="h-[30px] w-[25px] text-[#1B4332]" />
            <NavLink to="settings" className="text-xl text-gray-600">
              Settings
            </NavLink>
          </li>
          <li
            className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#B7E4C7]"
            onClick={handleLogout}
          >
            <FaPowerOff className="h-[30px] w-[25px] text-[#1B4332]" />
            <span className="text-xl text-gray-600">Logout</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
