import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getInstructor } from "../../services/apiInstructors";

export function useInstructor() {
  const { instructorId } = useParams();
  const parsedInstructorId = instructorId
    ? parseInt(instructorId, 10)
    : undefined;
  const {
    isPending: isLoadingInstructor,
    data: instructor,
    error,
  } = useQuery({
    queryKey: ["instructor", instructorId],
    queryFn: () =>
      parsedInstructorId !== undefined
        ? getInstructor(parsedInstructorId)
        : Promise.reject("InstructorId in undefined"),
  });
  return { isLoadingInstructor, instructor, error };
}
