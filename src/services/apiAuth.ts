import supabase, { supabase2, supabaseAdmin, supabaseUrl } from "./supabase";
interface User {
  password: string;
  fullName?: string;
  email?: string;
  phone?: string;
}
export async function signup({
  fullName,
  email,
  password,
  phone,
}: {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}) {
  const { data, error } = await supabase2.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        phone,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}
export async function getUsers() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    throw new Error(error.message);
  }

  return data.users;
}
export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error("Не удалось войти. Проверьте данные");
  console.log(data);
  return data;
}
export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (error) throw new Error("Не удалось войти. Проверьте данные");
  return data?.user;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error("Не удалось выйти из приложения");
}
export async function updateCurrentUser({
  password,
  fullName,
  avatar,
  phone,
}: {
  password: string;
  fullName: string;
  avatar: string | File;
  phone: string;
}) {
  let updateData: {
    password?: string;
    data?: {
      fullName?: string;
    };
  } = {};

  if (password) updateData.password = password;

  if (fullName) {
    updateData.data = { fullName };
  }

  if (!updateData.password && !updateData.data) {
    throw new Error("Нет данных для обновления");
  }

  // Обновляем данные пользователя через Supabase
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error("Не удалось обновить настройки профиля");

  // Если нет аватара, возвращаем результат
  if (!avatar) return data;

  // Работа с аватаром
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);
  if (storageError) throw new Error("Не удалось обновить аватар");

  // Обновляем информацию об аватаре
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
    },
  });
  if (error2) throw new Error("Не удалось обновить настройки профиля");

  console.log(updatedUser);
  return updatedUser;
}
