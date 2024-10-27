import { useQuery } from "@tanstack/react-query";
import { getRepeatParticipants } from "../../services/apiParticipants";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useRepeatParticipants() {
  const [searchParams] = useSearchParams();
  const numDays =
    !searchParams.get("last") || searchParams.get("last") === "all"
      ? "all"
      : Number(searchParams.get("last"));
  const queryDate =
    typeof numDays === "number"
      ? subDays(new Date(), numDays).toISOString()
      : "all";
  const { isPending: isLoading, data: participants } = useQuery({
    queryKey: ["repeatParticipants", `last-${numDays}`],
    queryFn: () => getRepeatParticipants(queryDate),
  });
  return { isLoading, participants };
}
