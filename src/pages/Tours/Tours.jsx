import { useQuery } from "@tanstack/react-query";
import { getTours } from "../../utils/apiTours";
import Hero from "../../components/Hero";
import Spinner from "../../components/Spinner";
import ToursSection from "./ToursSection";

export default function Tours() {
  const {
    isPending,
    data: tours,
    // error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: getTours,
  });

  if (isPending) return <Spinner />;

  return (
    <>
      <Hero />
      <ToursSection tours={tours} />
    </>
  );
}
