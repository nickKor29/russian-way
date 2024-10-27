import { getToday } from "../utils/helpers";
import supabase from "./supabase";

export async function getParticipationInfo() {
  const { data: tours, error: toursError } = await supabase
    .from("tours")
    .select("id,title,images,startDate,currentParticipants,maxParticipants");

  if (toursError) throw new Error("Не удалось загрузить данные о турах");
  const tourIds = tours.map((tour) => tour.id);
  console.log(tourIds);
  const enrichedTours = await Promise.all(
    tours.map(async (tour, i) => {
      const { data: participants, error: participantsError } = await supabase
        .from("users")
        .select("id,fullName,toursIds")
        .contains("toursIds", [tourIds[i]]);

      if (participantsError)
        throw new Error("Не удалось загрузить участников для тура");

      return {
        ...tour,
        participants: participants || [],
      };
    })
  );

  return enrichedTours;
}

export async function getParticipant(id: number) {
  console.log(id);

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  console.log(data);
  if (error) throw new Error("Не удалось загрузить данные участника");

  if (!data) return null;

  const reviews = await Promise.all(
    data.toursIds.map(async (id: number) => {
      console.log(id);
      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("id,comment")
        .eq("id", id)
        .single();
      if (error) throw new Error("Не удалось загрузить отзывы");
      return reviews;
    })
  );

  const tours = await Promise.all(
    data.toursIds.map(async (id: number) => {
      console.log(id);
      const { data: tours, error } = await supabase
        .from("tours")
        .select("id,title,startDate,endDate")
        .eq("id", id)
        .single();
      if (error) throw new Error("Не удалось загрузить туры");
      return tours;
    })
  );

  console.log(reviews);
  console.log(tours);

  return { ...data, reviews, tours };
}
export async function getRepeatParticipants(date: string) {
  let query;

  // Формирование запроса
  if (date === "all") {
    query = supabase.from("users").select("toursIds");
  } else {
    query = supabase
      .from("users")
      .select("toursIds")
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Не удалось получить участников: " + error.message);
  }

  return data;
}
