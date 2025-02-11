import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTour } from "../../utils/apiTours";
import { FaRegCalendarAlt } from "react-icons/fa";
import Spinner from "../../components/Spinner";

export default function TourDetails() {
  const { id } = useParams();

  const { isPending, data: tour } = useQuery({
    queryKey: ["tour"],
    queryFn: () => getTour(id),
  });

  if (isPending) return <Spinner />;

  return (
    <div className="flex flex-col gap-5">
      <img
        src={`/img/tours/${tour.data.data.imageCover}`}
        className="h-[700px] w-full"
      />
      <div className="flex justify-between">
        <div>
          <div>
            <h3>QUICK FACTS</h3>
            <ul>
              <li className="flex">
                <FaRegCalendarAlt />
                <span>NEXT DATE</span>
                <span>{}</span>
              </li>
              <li className="flex gap-5">
                <FaRegCalendarAlt />
                <span>DIFFICULTY</span>
                <span>{tour.data.data.difficulty}</span>
              </li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div>
            <h3>YOUR TOUR GUIDES</h3>
            <ul></ul>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2>{tour.data.data.name.toUpperCase()}</h2>
          <p>{tour.data.data.description}</p>
        </div>
      </div>
    </div>
  );
}
