import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTour as deleteTourApi } from "../../services/apiTours";
import toast from "react-hot-toast";

export function useDeleteTour() {
  const queryClient = useQueryClient();
  const { mutate: deleteTour, isPending: isDeleting } = useMutation({
    mutationFn: deleteTourApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] }),
        toast.success("Тур был успешно удален");
    },

    onError: () => toast.error("Не удалось удалить тур"),
  });
  return { deleteTour, isDeleting };
}
