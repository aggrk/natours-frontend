import { FaCalendar } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export default function Tour({ item }) {
  return (
    <div className="flex h-[550px] max-w-sm transform flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-105">
      <img
        src={`/img/tours/${item.imageCover}`}
        alt="tour"
        className="h-48 w-full object-cover"
      />

      <div className="flex-grow p-6">
        <h3 className="text-xl font-semibold text-[#2D6A4F]">{item.name}</h3>
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
        <button className="rounded-full bg-[#FFD166] px-6 py-2 text-black transition hover:bg-yellow-500">
          Details
        </button>
      </div>
    </div>
  );
}
