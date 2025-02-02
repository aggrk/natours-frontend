import { FaCalendar } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function Tour({ item }) {
  return (
    <div className="h-[550px] max-w-sm transform overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105">
      <img
        src={`/img/tours/${item.imageCover}`}
        alt="tour"
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#2D6A4F]">{item.name}</h3>
        <p className="mt-4 text-lg italic text-gray-700">{item.summary}</p>
        <div className="mt-4 grid grid-cols-2 gap-6">
          <p className="flex items-center text-sm text-gray-600 sm:text-base lg:text-base">
            <span className="mr-2 text-lg text-[#1B4332]">
              <FaLocationDot />
            </span>
            {item.startLocation.description}
          </p>
          <p className="flex items-center text-sm text-gray-600 sm:text-base lg:text-base">
            <span className="mr-2 text-lg text-[#1B4332]">
              <FaCalendar />
            </span>
            Date
          </p>
          <p className="flex items-center text-sm text-gray-600 sm:text-base lg:text-base">
            <span className="mr-2 text-lg text-[#1B4332]">
              <FaFlag />
            </span>
            {item.locations.length} stops
          </p>
          <p className="flex items-center text-sm text-gray-600 sm:text-base lg:text-base">
            <span className="mr-2 text-lg text-[#1B4332]">
              <FaUser />
            </span>
            {item.maxGroupSize} people
          </p>
        </div>

        <button className="mt-6 rounded-lg bg-[#FFD166] px-6 py-2 text-black transition hover:bg-yellow-500">
          View Details
        </button>
      </div>
    </div>
  );
}
