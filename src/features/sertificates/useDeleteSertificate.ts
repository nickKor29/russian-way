import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { deleteSertificate as deleteSertificateApi } from "../../services/apiSertificates";
export function useDeleteSertificate() {
  const { instructorId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deleteSertificate, isPending: isDeleting } = useMutation({
    mutationFn: deleteSertificateApi,
    onSuccess: () => {
      toast.success("Сертификат был успешно удален");
      queryClient.invalidateQueries({
        queryKey: ["sertificates", instructorId],
      });
    },
    onError: () => {
      toast.error("Произошла ошибка при удалении сертификата");
    },
  });
  return { deleteSertificate, isDeleting };
}
