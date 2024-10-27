import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getSertificates } from "../../services/apiSertificates";

export function useSertificates() {
  const { instructorId } = useParams();
  const parsedInstructorId = instructorId
    ? parseInt(instructorId, 10)
    : undefined;
  const {
    isPending: isGettingSertificates,
    data: sertificates,
    error,
  } = useQuery({
    queryKey: ["sertificates", parsedInstructorId],
    queryFn: () =>
      parsedInstructorId !== undefined
        ? getSertificates(parsedInstructorId)
        : Promise.reject("Instructor ID is undefined"),
  });
  return { isGettingSertificates, sertificates, error };
}
