import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditInstructor } from "../../services/apiInstructors";

export function useCreateInstructor() {
  const queryClient = useQueryClient();

  const { mutate: createInstructor, isPending: isCreating } = useMutation({
    mutationFn: createEditInstructor,
    onSuccess: () => {
      toast.success("Новый инструктов был успешно добевлен");
      queryClient.invalidateQueries({ queryKey: ["instructors"] });
    },
    onError: () => toast.error("Не удалось добавить нового иструктора"),
  });
  return { createInstructor, isCreating };
}
