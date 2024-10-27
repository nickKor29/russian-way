import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getReviews } from "../../services/apiReviews";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_USUAL } from "../../utils/constants";

export function useGetReviews() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  const sortByRaw = searchParams.get("sortBy") || "created_at-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {
    field,
    direction,
  };
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
  const { data: { data: reviews, count } = {}, isPending: isGettingReviews } =
    useQuery({
      queryKey: ["reviews", filterValue, sortBy, page],
      queryFn: () => getReviews({ filter: filter ?? undefined, sortBy, page }),
    });
  const pageCount = Math.ceil((count ?? 0) / PAGE_SIZE_USUAL);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["reviews", filterValue, sortBy, page + 1],
      queryFn: () =>
        getReviews({ filter: filter ?? undefined, sortBy, page: page + 1 }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["reviews", filterValue, sortBy, page - 1],
      queryFn: () =>
        getReviews({ filter: filter ?? undefined, sortBy, page: page - 1 }),
    });
  return { reviews, count, isGettingReviews };
}
