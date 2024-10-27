import { PAGE_SIZE_USUAL } from "../utils/constants";
import supabase from "./supabase";

export async function getReviews({
  filter,
  sortBy,
  page,
}: {
  filter?: { field: string; value: string };
  sortBy: { field: string; direction: string };
  page: number;
}) {
  let query = supabase.from("reviews").select("*", { count: "exact" });
  if (filter) query = query.eq(filter.field, filter.value);
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  if (page) {
    const from = (page - 1) * PAGE_SIZE_USUAL;
    const to = from + PAGE_SIZE_USUAL - 1;
    query = query.range(from, to);
  }
  const { data, count, error } = await query;
  if (error) throw new Error("Не удалось загрузить отзывы");
  return { data, count };
}
export async function getReview(id: number) {
  const { data, error } = await supabase
    .from("reviews")
    .select(
      `
      *,
      users(fullName),
      tours (
        title,
        startDate,
        endDate,
        images,
        instructors (
          name,
          id,
          profileImage
         
        )
      )
    `
    )
    .eq("id", id)
    .single();

  if (error)
    throw new Error("Не удалось получить отзыв с информацией об инструкторе");
  return data;
}
export async function changeStatus(
  id: number | undefined,
  dataObj: { status: string; rejectionReason?: string }
) {
  const { data, error } = await supabase
    .from("reviews")
    .update(dataObj)
    .eq("id", id)
    .select();
  if (error) throw new Error("Не удалось изменить статус отзыва");
  return data;
}
export async function deleteReview(id: number) {
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) throw new Error("Не удалось удалить отзыв");
}
export async function getAverageRating(id?: number) {
  let query = supabase.from("reviews").select("rating");
  id ? (query = query.eq("tourId", id)) : query;

  const { data, error } = await query;
  if (error) throw new Error("Не удалось получить средний рейтинг");
  const averageRating =
    data.reduce((acc, cur) => acc + cur.rating, 0) / data.length;
  if (id) {
    return { averageRating, quantity: data.length };
  }

  return averageRating.toFixed(1);
}
