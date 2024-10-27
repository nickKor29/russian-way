import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview as deleteReviewApi } from "../../services/apiReviews";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
export function useDeleteReview() {
  const { reviewId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteReview, isPending: isDeleting } = useMutation({
    mutationFn: deleteReviewApi,
    onSuccess: () => {
      toast.success(`Отзыв был успешно удален`);
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });
      queryClient.invalidateQueries({
        queryKey: ["review", reviewId],
      });
    },
    onError: () => toast.error("Не удалось удалить отзыв"),
  });
  return { deleteReview, isDeleting };
}
