import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { changeStatus as changeStatusApi } from "../../services/apiReviews";
import toast from "react-hot-toast";

export function useChangeStatus() {
  const { reviewId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: changeStatus, isPending: isChanging } = useMutation({
    mutationFn: (dataObj: { status: string; rejectionReason?: string }) => {
      const numericReviewId = reviewId ? parseInt(reviewId, 10) : undefined;
      return changeStatusApi(numericReviewId, dataObj);
    },
    onSuccess: () => {
      toast.success(`Статус отзыва #${reviewId} был изменен`);
      queryClient.invalidateQueries({
        queryKey: ["review", reviewId],
      });
    },
    onError: () => toast.error("Не удалось изменить статус"),
  });

  return { changeStatus, isChanging };
}
