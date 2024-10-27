import { useQuery } from "@tanstack/react-query";
import { getInstructors } from "../../services/apiInstructors";
import { InstructorsSearch } from "../../utils/types";

export function useInstructors({ option, value }: InstructorsSearch) {
  const { isPending: isLoadingInstructors, data: instructors = [] } = useQuery({
    queryKey: ["instructors", option, value],
    queryFn: () => getInstructors({ option, value }),
  });

  return { isLoadingInstructors, instructors };
}
