import { useQuery } from "@tanstack/react-query";
import ToursSection from "../pages/Tours/ToursSection";
import { getTours } from "../utils/apiTours";
import Spinner from "../components/Spinner";

export default function DashTours() {
  const { isPending, data: tours } = useQuery({
    queryFn: getTours,
    queryKey: ["tours"],
  });

  if (isPending) return <Spinner size="h-16 w-16" screen="min-h-screen" />;
  return <ToursSection tours={tours} />;
}
