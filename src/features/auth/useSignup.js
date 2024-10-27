import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(user);
      toast.success("Новый пользователь успешно зарегистрирован");
    },
  });
  return { signup, isPending };
}
