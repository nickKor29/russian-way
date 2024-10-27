import { useQuery } from "@tanstack/react-query";
import { getAverageRating } from "../../services/apiReviews";

export function useAverageRating(id?: number) {
  const { data: averageRating, isPending: isGettingRating } = useQuery({
    queryKey: ["rating", id],
    queryFn: () => getAverageRating(id),
  });
  return { averageRating, isGettingRating };
}
