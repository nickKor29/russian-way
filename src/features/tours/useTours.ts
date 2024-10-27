import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTours } from "../../services/apiTours";
import { PAGE_SIZE_TOURS } from "../../utils/constants";
import { TourData, ToursOptions } from "../../utils/types";

export function useTours({ option, optionValue, total }: ToursOptions) {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const filterValue = searchParams.get("available");

  const filter =
    filterValue === "all" ? null : { field: "available", value: filterValue };

  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = {
    field,
    direction,
  };
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isPending, data, error } = useQuery({
    queryKey: ["tours", option, optionValue, filter, sortBy, page],
    queryFn: () =>
      getTours({
        option: option as string,
        optionValue: optionValue as string,
        page,
        filter,
        sortBy,
        total,
      }),
  });
  const tours = data?.data || [];
  const count = data?.count || 0;
  const pageCount = Math.ceil(count / PAGE_SIZE_TOURS);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["tours", option, optionValue, filter, sortBy, page + 1],
      queryFn: () =>
        getTours({
          option: option as string,
          optionValue: optionValue as string,
          page: page + 1,
          filter,
          sortBy,
          total,
        }),
    });
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["tours", option, optionValue, filter, sortBy, page - 1],
      queryFn: () =>
        getTours({
          option: option as string,
          optionValue: optionValue as string,
          page: page - 1,
          filter,
          sortBy,
          total,
        }),
    });

  return { isPending, count, error, tours };
}
