import { useQuery } from "@tanstack/react-query";
import { getTotalTours } from "../../services/apiTours";
import { useSearchParams } from "react-router-dom";
import { subDays } from "date-fns";

export function useTotalTours({ isDate }: { isDate?: boolean }) {
  const [searchParams] = useSearchParams();
  const numDays =
    searchParams.get("last") === "all"
      ? "all"
      : searchParams.get("last")
      ? Number(searchParams.get("last"))
      : 180;

  const queryDate =
    typeof numDays === "number"
      ? subDays(new Date(), numDays).toISOString()
      : "all";
  const { isPending, data: tours } = useQuery({
    queryKey: ["tours", `last-${numDays}`],
    queryFn: () =>
      getTotalTours({ date: isDate ? queryDate : undefined, isDate }),
  });
  return { isPending, tours, numDays };
}
