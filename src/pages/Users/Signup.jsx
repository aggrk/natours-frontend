import { NavLink } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8F3DC]">
      <form
        action=""
        className="h-auto w-[90%] max-w-[450px] rounded-2xl bg-white px-8 py-4 shadow-md sm:max-w-[500px]"
      >
        <h3 className="text-center text-2xl font-semibold">Signup</h3>
        <div className="mt-5 flex flex-col gap-2">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
          />
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your Email"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
          />
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
          />
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <label htmlFor="" className="text-xl text-[#1B4442]">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded-full border-2 border-[#2D6A4F] px-4 py-2 outline-0 focus:ring-2 focus:ring-[#1B4442]"
          />
        </div>
        <div className="mt-8">
          <button className="w-full cursor-pointer rounded-full bg-[#FFD166] py-2 text-xl transition hover:bg-yellow-500">
            Signup
          </button>
        </div>
        <div className="mt-5">
          <p className="px-2 text-base sm:text-lg">
            Already have an account?{" "}
            <NavLink to="/signin" className="text-[#2D6A4F]">
              Signin
            </NavLink>
          </p>
        </div>
      </form>
    </div>
  );
}
