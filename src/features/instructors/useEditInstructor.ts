import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditInstructor } from "../../services/apiInstructors";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface EditInstructorArgs {
  instructor: { archived: boolean };
  id: number;
}

export function useEditInstructor() {
  const { instructorId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: editInstructor, isPending: isEditing } = useMutation({
    mutationFn: ({ instructor, id }: EditInstructorArgs) =>
      createEditInstructor(instructor, id),
    onSuccess: () => {
      toast.success("Данные инструктора были изменены");
      queryClient.invalidateQueries({
        queryKey: ["instructor", instructorId],
      });
      queryClient.invalidateQueries({
        queryKey: ["instructors", "archived", true],
      });
      queryClient.invalidateQueries({
        queryKey: ["instructors", "archived", false],
      });
    },
    onError: () => toast.error("Не удалось обновить данные инструктора"),
  });

  return { editInstructor, isEditing };
}
