import Tour from "./Tour";

export default function ToursSection({ tours }) {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header with responsive typography */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-[#1B4332] sm:text-4xl md:text-[2.5rem] lg:text-5xl">
            Explore Our Tours
          </h2>
          <p className="mt-3 text-base text-gray-600 sm:mt-4 sm:text-lg">
            Discover breathtaking adventures tailored for you
          </p>
        </div>

        {/* Responsive tour grid with adaptive gaps */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-10 sm:grid-cols-2 sm:gap-6 md:gap-7 lg:mt-12 lg:grid-cols-3 lg:gap-8">
          {tours?.data?.data.map((tour) => (
            <Tour
              key={tour.id}
              item={tour}
              className="transform transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2"
            />
          ))}
        </div>

        {/* Responsive "View All" button */}
        {/* <div className="mt-10 text-center sm:mt-12 md:mt-14">
          <button className="cursor-pointer rounded-lg bg-[#1B4332] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#2D6A4F] hover:shadow-md sm:px-7 sm:py-3 sm:text-base md:px-8 md:text-lg">
            View All Tours
          </button>
        </div> */}
      </div>
    </section>
  );
}
