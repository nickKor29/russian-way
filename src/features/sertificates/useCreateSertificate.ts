import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSertificate } from "../../services/apiSertificates";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useCreateSertificate() {
  const { instructorId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: createSertificate, isPending: isCreating } = useMutation({
    mutationFn: addSertificate,
    onSuccess: () => {
      toast.success("Новый сертификат был успешно добавлен");
      queryClient.invalidateQueries({
        queryKey: ["sertificates", instructorId],
      });
    },
    onError: () => {
      toast.error("Не удалось добавить новый сертификат");
    },
  });
  return { createSertificate, isCreating };
}
