import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getReview } from "../../services/apiReviews";

export function useReview() {
  const { reviewId } = useParams<{ reviewId: string }>();
  const parsedReviewId = reviewId ? parseInt(reviewId, 10) : undefined;

  const { data: review, isPending: isGettingReview } = useQuery({
    queryKey: ["review", parsedReviewId],
    queryFn: () =>
      parsedReviewId !== undefined
        ? getReview(parsedReviewId)
        : Promise.reject("Review ID is undefined"),
  });

  return { review, isGettingReview };
}
