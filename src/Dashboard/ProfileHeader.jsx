export default function ProfileHeader() {
  return (
    <header className="relative mb-6 rounded-xl bg-gradient-to-r from-[#2D6A4F] to-[#40916C] p-6 text-white shadow-lg sm:p-8">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')] opacity-10"></div>
      <h1 className="relative text-2xl font-extrabold tracking-tight sm:text-3xl">
        Your Profile
      </h1>
      <p className="relative mt-1 text-sm opacity-80 sm:text-base">
        Manage your account and explore your adventures
      </p>
    </header>
  );
}
