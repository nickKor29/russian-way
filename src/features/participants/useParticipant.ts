import { useQuery } from "@tanstack/react-query";
import { getParticipant } from "../../services/apiParticipants";

export function useParticipant(id: number) {
  const { isPending: isLoading, data: participant } = useQuery({
    queryKey: ["participant", id],
    queryFn: () => getParticipant(id),
  });
  return { isLoading, participant };
}
