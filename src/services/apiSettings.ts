import supabase from "./supabase";

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();
  if (error) throw new Error("Не удалось получить настройки");

  return data;
}
export async function updateSetting(newSetting: { [key: string]: string }) {
  console.log(newSetting);
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();
  if (error) throw new Error("Не получилось обновить настройки");
  return data;
}
