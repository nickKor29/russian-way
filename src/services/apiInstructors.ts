import { DateRange, InstructorsSearch, InstructorFull } from "../utils/types";
import supabase, { supabaseUrl } from "./supabase";

interface Instructor {
  id: number;
  name: string;
  profileImage: string;
}

// Интерфейс для данных тура
interface Tour {
  id: number;
  instructorId: number;
}

export async function getOccupiedInstructorIds({
  startDate,
  endDate,
}: DateRange) {
  const { data, error } = await supabase
    .from("tours")
    .select("instructorId, id")
    .neq("startDate", startDate)
    .neq("endDate", endDate)
    .or(
      `and(startDate.lt.${startDate},endDate.lt.${startDate}),and(startDate.gt.${endDate})`
    );
  console.log(data);
  if (error)
    throw new Error("Произошла ошибка при получении свободных иструкторов");
  const excludedIds = Array.from(new Set(data.map((item: Tour) => item.id)));
  console.log(data);
  console.log(excludedIds);
  const { data: busyInstructorsIds, error: busyError } = await supabase
    .from("tours")
    .select("instructorId")
    .not("id", "in", `(${excludedIds.join(",")})`);
  if (busyError)
    throw new Error("Произошла ошибка при получении свободных иструкторов");
  console.log(busyInstructorsIds);
  const { data: otherInstructors, error: error2 } = await supabase
    .from("instructors")
    .select("id")
    .not("id", "in", `(${excludedIds.join(",")})`);
  console.log(data);
  console.log(otherInstructors);
  if (error2)
    throw new Error("Произошла ошибка при получении свободных иструкторов");
  const sutableInstructors = data.filter(
    (obj: Tour) =>
      !busyInstructorsIds.some((obj2) => obj.instructorId === obj2.instructorId)
  );
  const totalFreeInstructorsIds = [
    ...sutableInstructors.map((obj) => obj.instructorId),
    ...otherInstructors
      .filter(
        (obj) =>
          !busyInstructorsIds.some((obj2) => obj.id === obj2.instructorId)
      )
      .map((obj) => obj.id),
  ];
  console.log(totalFreeInstructorsIds);
  const { data: instructors, error: instructorError } = await supabase
    .from("instructors")
    .select("id,name,profileImage")
    .in("id", totalFreeInstructorsIds);

  if (instructorError) {
    throw new Error("Не получилось получить доступных инструкторов");
  }

  // console.log(instructors);
  return instructors as Instructor[];
}

export async function getInstructors({
  option,
  value,
}: InstructorsSearch): Promise<InstructorFull[]> {
  console.log(option, value);
  let query = supabase.from("instructors").select("*");
  if (option) query = query.eq(option, value);

  const { data, error } = await query;

  if (error) throw new Error("Не удалось получить инструкторов");
  console.log(data);
  return data;
}
export async function getInstructor(id: number) {
  console.log(id, typeof id);
  const { data, error } = await supabase
    .from("instructors")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error("Не удалось получить инструкторов");

  return data;
}

export async function createEditInstructor({
  instructor,
  id,
}: {
  instructor: any;
  id?: number;
}) {
  console.log(instructor, id);
  let imagePath: any;
  console.log(instructor);

  if (
    instructor.profileImage &&
    !instructor.profileImage.name.startsWith(supabaseUrl)
  ) {
    console.log("SDADASD@SD@!DSADA");

    const imageName = `${Date.now()}-${instructor.profileImage.name.replace(
      /[^a-z0-9.]/gi,
      "_"
    )}`;

    imagePath = `${supabaseUrl}/storage/v1/object/public/instructorsPhotos/${imageName}`;

    const { error: uploadError }: any = await supabase.storage
      .from("instructorsPhotos")
      .upload(imageName, instructor.profileImage);
    console.log(imagePath);
    console.log(uploadError);

    if (uploadError) {
      console.error("Ошибка при загрузке изображения:", uploadError.message);
      throw new Error("Ошибка при загрузке изображения");
    }

    instructor.profileImage = imagePath;
  } else if (!instructor.profileImage) {
    console.log("SDADASD@SD@!DSADA");
    delete instructor.profileImage;
  }
  console.log(id);

  let query: any = supabase.from("instructors");

  if (id) {
    query = query.update(instructor).eq("id", id);
  } else {
    query = query.insert([instructor]);
  }

  const { data, error }: any = await query.select();
  if (error) {
    console.error("Ошибка создания/обновления инструктора:", error.message);
    throw new Error("Не получилось создать или обновить инструктора");
  }
  console.log(data);
  console.log(error);
  return data;
}

export async function deleteInstructor(id: any) {
  const { error }: any = await supabase
    .from("instructors")
    .delete()
    .eq("id", id);
  if (error) throw new Error("Не удалось удалить иструктора");
}
