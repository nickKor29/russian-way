import { Sertificate } from "../utils/types";
import supabase from "./supabase";

export async function addSertificate(
  sertificates: Sertificate | Sertificate[]
) {
  console.log(sertificates);

  let query;

  Array.isArray(sertificates)
    ? (query = supabase.from("sertificates").insert(sertificates))
    : (query = supabase.from("sertificates").insert([sertificates]));

  // Выполняем запрос и получаем данные
  const { data, error } = await query.select("*");

  if (error) {
    console.error("Ошибка при добавлении сертификата:", error);
    throw new Error("Не удалось добавить сертификат");
  }

  return data;
}

export async function deleteSertificate({
  option,
  value,
}: {
  option: string;
  value: number;
}) {
  console.log(option, value);
  const { error } = await supabase
    .from("sertificates")
    .delete()
    .eq(option, value);
  if (error) throw new Error("Не удалось удалить сертификат");
}
export async function getSertificates(id: number) {
  const { data, error } = await supabase
    .from("sertificates")
    .select("*")
    .eq("instructorId", id);
  if (error) throw new Error("Не удалось получить сертификаты инструктора");

  return data;
}
