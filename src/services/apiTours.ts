import { PAGE_SIZE_TOURS } from "../utils/constants";
import { getToday } from "../utils/helpers";
import { TourData } from "../utils/types";
import supabase, { supabaseUrl } from "./supabase";
export async function getTotalTours({
  date,
  isDate,
}: {
  date?: string;
  isDate?: boolean;
}) {
  let query;

  if (date === "all" || !date) {
    query = supabase.from("tours").select("*");
  } else {
    query = supabase
      .from("tours")
      .select("*")
      .gte("created_at", date)
      .lte("created_at", getToday({ end: true }));
  }

  const { data, error } = await query;

  if (error) {
    throw new Error("Не удалось загрузить туры: " + error.message);
  }

  console.log(data);
  return data;
}

export async function getTours({
  option,
  optionValue,
  page,
  filter,
  sortBy,
  total,
}: {
  option: string;
  optionValue: number | string;
  page: number;
  filter: { field: string; value: string | null } | null;
  sortBy: { field: string; direction: string };
  total?: boolean;
}) {
  console.log(option, optionValue, page, filter);
  console.log(total);
  console.log(sortBy);

  let query = supabase.from("tours").select("*", { count: "exact" });

  if (option && optionValue) {
    query = query.eq(option, optionValue);
    console.log(1);
  }

  if (filter && filter.value) {
    query = query.eq(filter.field, filter.value);
    console.log(2);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
    console.log(3);
  }

  if (page && !total) {
    const from = (page - 1) * PAGE_SIZE_TOURS;
    const to = from + PAGE_SIZE_TOURS - 1;
    query = query.range(from, to);
    console.log(4);
  }

  // Выполняем запрос
  const { data, count, error } = await query;

  if (error) {
    console.error("Ошибка загрузки туров:", error.message);
    throw new Error("Не удалось загрузить туры");
  }

  console.log(data);

  return { data, count };
}

export async function getTour(id: number) {
  const { data, error } = await supabase
    .from("tours")
    .select("*, instructors(name,id,profileImage,bioText)")
    .eq("id", id)
    .single();
  if (error) throw new Error("Не удалось получить тур");

  return data;
}

export async function createEditTour({
  tour,
  id,
}: {
  tour: TourData;
  id?: number;
}) {
  console.log(tour);
  console.log(id);
  const imagesFiles: { index: number; img: File | string }[] = tour.images
    .map((img, i) => {
      return {
        index: i,
        img,
      };
    })
    .filter((item): item is { index: number; img: string } => item !== null);

  const imagesNames = imagesFiles.map((image) => {
    const imgName = image.img instanceof File ? image.img.name : image.img;

    return {
      name: `${Date.now()}-${imgName.replace(/[^a-z0-9.]/gi, "_")}`,
      index: image.index,
    };
  });
  console.log(imagesNames);

  const imagesPaths = imagesFiles.length
    ? imagesNames.map((img) => {
        return {
          path: `${supabaseUrl}/storage/v1/object/public/tours/${img.name}`,
          index: img.index,
        };
      })
    : tour.images;

  if (imagesFiles.length) {
    imagesPaths.forEach((item) => {
      if (typeof item === "object" && "path" in item) {
        tour.images[item.index] = item.path;
      }
    });
  }

  console.log(imagesPaths);
  console.log(tour.images);

  let query;

  if (id) {
    query = supabase.from("tours").update(tour).eq("id", id);
  } else {
    const tourData = tour.discount === "" ? { ...tour, discount: null } : tour;
    query = supabase.from("tours").insert([tourData]);
  }
  console.log(tour);
  const { data, error } = await query.select().single();
  if (error) {
    console.error("Ошибка создания/обновления тура:", error.message);
    throw new Error("Не получилось создать или обновить тур");
  }
  console.log(data);

  if (imagesFiles.length) {
    try {
      const uploadPromises = imagesNames.map(({ name, index }) => {
        const foundImage = imagesFiles.find((image) => image.index === index);
        if (!foundImage) {
          throw new Error(`Image with index ${index} not found`);
        }
        return supabase.storage.from("tours").upload(name, foundImage.img);
      });

      const uploadResults = await Promise.all(uploadPromises);

      for (const result of uploadResults) {
        if (result.error) {
          console.error("Ошибка при загрузке файла:", result.error.message);
          await supabase.from("tours").delete().eq("id", data.id);
          throw new Error("Ошибка при загрузке файлов, запись тура удалена.");
        }
      }
    } catch (uploadError) {
      if (uploadError instanceof Error) {
        console.error(
          "Ошибка при параллельной загрузке файлов:",
          uploadError.message
        );
      } else {
        console.error("Неизвестная ошибка:", uploadError);
      }
      throw uploadError;
    }
  }

  return data;
}
export async function deleteTour(id: number) {
  const { error } = await supabase.from("tours").delete().eq("id", id);
  if (error) throw new Error("Не получилось удалить тур");
}
export async function getTourBy({
  option,
  value,
}: {
  option: string;
  value: number;
}) {
  const { data, error } = await supabase
    .from("tours")
    .select("id,title")
    .eq(option, value);
  if (error) throw new Error("Не удалось получить туры");
  return data;
}
