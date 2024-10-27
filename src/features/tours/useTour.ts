import { useQuery } from "@tanstack/react-query";
import { getTour } from "../../services/apiTours";
import { useParams } from "react-router-dom";

export function useTour() {
  const { tourId } = useParams();
  const parsedTourId = tourId ? parseInt(tourId, 10) : undefined;
  const {
    isPending,
    data: tour,
    error,
  } = useQuery({
    queryKey: ["tour", tourId],
    queryFn: () =>
      parsedTourId !== undefined
        ? getTour(parsedTourId)
        : Promise.reject("TourId is undefined"),
  });
  return { isPending, tour, error };
}
