import { useQuery } from "@tanstack/react-query";
import { getOccupiedInstructorIds } from "../../services/apiInstructors";
import { DateRange } from "../../utils/types";

export function useOccupiedInstructors({ startDate, endDate }: DateRange) {
  const {
    isLoading: isLoadingOccupiedInstructors,
    data: occupiedInstructors,
    error,
  } = useQuery({
    queryKey: ["occupiedInstructors", startDate, endDate],
    queryFn: () => getOccupiedInstructorIds({ startDate, endDate }),
    enabled: !!startDate && !!endDate,
  });

  return { isLoadingOccupiedInstructors, occupiedInstructors, error };
}
