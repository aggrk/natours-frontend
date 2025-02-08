import { useQuery } from "@tanstack/react-query";
import Sidebar from "../layouts/Sidebar";
import { fetchUser } from "../utils/apiTours";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  const {
    isPending,
    isError,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: 1,
  });

  if (isPending) return <Spinner />;
  if (isError) toast.error(error.message);

  return (
    <div className="grid min-h-screen md:grid-cols-[380px,1fr]">
      <Sidebar user={user} />
      <div className="ml-[280px] flex flex-1 flex-col">
        {/* Fixed Header */}
        <header className="fixed right-0 top-0 z-10 h-[80px] w-full border-b border-[#D8F3DC] bg-[#D8F3DC] shadow md:left-[380px] md:col-start-2">
          <div className="flex w-full justify-between">
            <FaSearch className="text-xl text-[#1B4332]" />
            <button className="place-self-end text-white focus:outline-none md:hidden">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="ml-[50px] mt-[50px] w-full overflow-y-auto bg-gray-100 md:col-start-2 md:h-[calc(100vh-50px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
