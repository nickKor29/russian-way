import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteInstructor as deleteInstructorApi } from "../../services/apiInstructors";
export function useDeleteInstructors() {
  const queryClient = useQueryClient();
  const { mutate: deleteInstructor, isPending: isDeleting } = useMutation({
    mutationFn: deleteInstructorApi,
    onSuccess: () => {
      toast.success("Сертификат был успешно удален");
      queryClient.invalidateQueries({
        queryKey: ["instructors"],
      });
    },
    onError: () => {
      toast.error("Произошла ошибка при удалении сертификата");
    },
  });
  return { deleteInstructor, isDeleting };
}
