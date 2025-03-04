import { NavLink } from "react-router-dom";

export default function SidebarLink({ to, Icon, label, setIsSidebarOpen }) {
  return (
    <li className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition-colors duration-200 hover:bg-[#B7E4C7]">
      <Icon className="h-[25px] w-[25px] text-[#1B4332]" />
      <NavLink
        to={to}
        className={({ isActive }) =>
          `text-lg transition-colors duration-200 ${
            isActive ? "font-semibold text-[#1B4332]" : "text-gray-600"
          }`
        }
        onClick={() => setIsSidebarOpen(false)}
      >
        {label}
      </NavLink>
    </li>
  );
}
