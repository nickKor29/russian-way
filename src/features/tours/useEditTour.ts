import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditTour as editTourApi } from "../../services/apiTours";
import toast from "react-hot-toast";
export function useEditTour() {
  const queryClient = useQueryClient();

  const { mutate: editTour, isPending: isEditing } = useMutation({
    mutationFn: editTourApi,

    onSuccess: () => {
      toast.success("Тур был успешно изменен");
      queryClient.invalidateQueries({ queryKey: ["tour"] });
    },
    onError: () => toast.error("Не удалось изменить тур"),
  });
  return { isEditing, editTour };
}
