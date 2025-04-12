import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaFlag,
  FaUsers,
  FaStar,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { getTour } from "../../utils/apiTours";
import Spinner from "../../components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { URL } from "../../utils/urls";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function TourDetails() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const { isPending, data } = useQuery({
    queryKey: ["tour"],
    queryFn: () => getTour(id),
  });

  const tour = data?.data?.data;

  if (isPending) return <Spinner />;

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Image Gallery Navigation */}
      <section className="relative h-80 overflow-hidden sm:h-96">
        <div className="relative h-full w-full">
          <img
            src={`${URL}/tours/${tour.images?.[activeImage] || tour.imageCover}`}
            alt={tour.name}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 to-transparent" />

          {/* Image Navigation */}
          {tour.images?.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {tour.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`h-2 w-2 rounded-full transition-all ${activeImage === index ? "w-4 bg-white" : "bg-white/50"}`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            {tour.name}
          </h1>
          <div className="mt-2 flex items-center justify-center space-x-2 text-white">
            <FaMapMarkerAlt className="text-[#FFD166]" />
            <span>{tour.startLocation.description}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Overview Card */}
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-[#1B4332] md:text-3xl">
                Tour Highlights
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F]">
                    <FaCalendarAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Duration</h3>
                    <p className="text-gray-600">{tour.duration} days</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F]">
                    <FaUsers className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Group Size</h3>
                    <p className="text-gray-600">
                      {tour.maxGroupSize} people max
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F]">
                    <FaStar className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Rating</h3>
                    <p className="text-gray-600">
                      {tour.ratingsAverage} ({tour.ratingsQuantity} reviews)
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rounded-lg bg-gray-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F]">
                    <FaFlag className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Difficulty</h3>
                    <p className="capitalize text-gray-600">
                      {tour.difficulty}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-[#1B4332] md:text-3xl">
                About This Tour
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="text-lg leading-relaxed">{tour.summary}</p>
                <p className="mt-4 leading-relaxed">{tour.description}</p>
              </div>
            </div>

            {/* Itinerary Section */}
            <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-[#1B4332] md:text-3xl">
                Daily Itinerary
              </h2>
              <div className="space-y-6">
                {tour.locations.map((loc, i) => (
                  <div key={i} className="flex">
                    <div className="mr-4 flex flex-col items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D6A4F] text-white">
                        {i + 1}
                      </div>
                      {i !== tour.locations.length - 1 && (
                        <div className="h-full w-0.5 bg-gray-200"></div>
                      )}
                    </div>
                    <div className="pb-6">
                      <h3 className="text-lg font-bold text-gray-900">
                        Day {loc.day}: {loc.description}
                      </h3>
                      <p className="mt-1 text-gray-600">
                        Activities: Hiking, Sightseeing
                      </p>
                      {i === 0 && (
                        <div className="mt-3 rounded-lg border border-gray-200 p-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-[#2D6A4F]" />
                            <span>
                              Starting point: {tour.startLocation.description}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            {tour.startLocation?.coordinates && (
              <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-[#1B4332] md:text-3xl">
                  Tour Location
                </h2>
                <div className="h-64 overflow-hidden rounded-lg sm:h-80">
                  <MapContainer
                    center={[
                      tour.startLocation.coordinates[1],
                      tour.startLocation.coordinates[0],
                    ]}
                    zoom={8}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker
                      position={[
                        tour.startLocation.coordinates[1],
                        tour.startLocation.coordinates[0],
                      ]}
                    >
                      <Popup>{tour.startLocation.description}</Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Booking Card */}
          <div className="sticky top-4 h-fit lg:top-8">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#1B4332] md:text-2xl">
                  Book This Adventure
                </h3>
                <button className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#FF6B6B]">
                  <FaHeart className="text-xl" />
                </button>
              </div>

              <div className="my-6 space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <span className="text-gray-600">Next Date</span>
                  <span className="font-medium">
                    {new Date(tour.startDates[0]).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-medium capitalize">
                    {tour.difficulty}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                  <span className="text-gray-600">Group Size</span>
                  <span className="font-medium">
                    {tour.maxGroupSize} people
                  </span>
                </div>
              </div>

              <div className="mb-6 border-t border-gray-200 pt-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <p className="text-3xl font-bold text-[#1B4332]">
                      ${tour.price}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">per person</p>
                </div>
              </div>

              <button className="flex w-full items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-[#FFD166] to-[#FFB700] px-6 py-4 font-bold text-black transition-transform hover:shadow-lg hover:brightness-105 active:scale-95">
                <span>Book Now</span>
                <FaArrowRight />
              </button>
            </div>

            {/* Gallery Preview */}
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold text-[#1B4332]">
                Photo Gallery
              </h3>
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
                {tour.images?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square overflow-hidden rounded-lg transition-all ${activeImage === i ? "ring-2 ring-[#FFD166]" : "hover:ring-1 hover:ring-gray-300"}`}
                  >
                    <img
                      src={`${URL}/tours/${img}`}
                      alt={`Tour preview ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Facts */}
            <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="mb-4 text-xl font-bold text-[#1B4332]">
                Quick Contact
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600">
                  Have questions? Contact our tour specialists.
                </p>
                <button className="w-full rounded-lg border border-[#1B4332] px-4 py-2 font-medium text-[#1B4332] transition hover:bg-[#1B4332] hover:text-white">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
