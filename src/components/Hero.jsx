export default function Hero() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{
            backgroundImage: 'url("./img/tours/tour-1-cover.jpg")',
            filter: "brightness(0.85)",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/90 to-[#2D6A4F]/50"></div>
        </div>
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
        {/* Animated Text Container */}
        <div className="mb-8 space-y-6 rounded-2xl border border-white/20 bg-black/10 p-6 backdrop-blur-sm">
          <h1 className="animate-slide-up text-4xl font-bold md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-[#FFD166] to-[#FFB700] bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <br />
            <span className="mt-2 inline-block text-white">
              Tours Worldwide
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-xl font-light leading-relaxed text-white/90 md:text-2xl">
            Experience unforgettable adventures in the heart of nature with
            expert guides
          </p>
        </div>

        {/* Animated Button */}
        <button className="group relative rounded-full bg-gradient-to-r from-[#FFD166] to-[#FFB700] px-12 py-4 text-lg font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:from-[#FFB700] hover:to-[#FFD166] hover:shadow-xl">
          <span className="relative z-10">Book Your Adventure</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFB700] to-[#FFD166] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </button>

        {/* Scrolling Indicator */}
        <div className="absolute bottom-8 animate-bounce">
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
