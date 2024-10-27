import { useQuery } from "@tanstack/react-query";
import { getParticipationInfo } from "../../services/apiParticipants";

export function useParticipants() {
  const { isPending: isLoading, data: participants } = useQuery({
    queryKey: ["participants"],
    queryFn: getParticipationInfo,
  });
  return { isLoading, participants };
}
