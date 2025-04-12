export default function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[500px] w-full overflow-hidden md:min-h-[600px]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
          style={{
            backgroundImage: 'url("./img/tour-1-cover.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 via-[#1B4332]/30 to-[#2D6A4F]/50"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        {/* Text Container */}
        <div className="mb-8 w-full max-w-4xl space-y-6 rounded-2xl border border-white/20 bg-black/10 p-6 backdrop-blur-sm sm:p-8">
          <h1 className="animate-slide-up text-4xl font-bold sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-[#FFD166] to-[#FFB700] bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <br />
            <span className="mt-2 inline-block text-white">
              Tours Worldwide
            </span>
          </h1>
          <p className="mx-auto text-lg leading-relaxed text-white/90 md:text-xl lg:max-w-2xl">
            Experience unforgettable adventures in the heart of nature with
            expert guides
          </p>
        </div>

        {/* Button */}
        <button className="group relative cursor-pointer rounded-full bg-gradient-to-r from-[#FFD166] to-[#FFB700] px-10 py-3 text-lg font-semibold text-black shadow-lg transition-all duration-300 hover:shadow-xl hover:brightness-105 md:px-12 md:py-4">
          <span className="relative z-10">Book Your Adventure</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB700] to-[#FFD166] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </button>

        {/* Scrolling Indicator Arrow - Restored & Enhanced */}
        <div className="animate-float absolute bottom-8">
          <svg
            className="h-8 w-8 text-white/80 hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
