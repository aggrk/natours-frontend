export default function Hero() {
  return (
    <section className="relative h-[450px] w-full bg-[#2D6A4F] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("./img/tours/tour-1-cover.jpg")' }}
      ></div>
      <div className="container relative mx-auto flex h-full flex-col items-center justify-center p-6 text-center">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Discover Amazing Tours
        </h1>
        <p className="mb-6 text-lg">
          Experience unforgettable adventures in the heart of nature.
        </p>
        <button className="rounded-lg bg-[#FFD166] px-8 py-3 text-black transition hover:bg-yellow-500">
          Book Your Tour
        </button>
      </div>
    </section>
  );
}
