import { useQuery } from "@tanstack/react-query";
import Layout from "./Layout";
import { fetchUser } from "../utils/apiTours";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

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

  if (isPending) return <Spinner size="h-16 w-16" screen="min-h-screen" />;
  if (isError) toast.error(error.message);

  return (
    <div className="grid min-h-screen md:grid-cols-[380px,1fr]">
      <Layout user={user} />
    </div>
  );
}
