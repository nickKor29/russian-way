import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditTour as createTourApi } from "../../services/apiTours";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useCreateTour() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutateAsync: createTour, isPending: isCreatingTour } = useMutation({
    mutationFn: createTourApi,
    onSuccess: (newTour) => {
      toast.success("Тур успешно был создан");
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      navigate(`/tours/${newTour.id}`);
    },
    onError: () => toast.error("Не удалось создать тур"),
  });

  return { createTour, isCreatingTour };
}
