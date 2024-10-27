import {
  differenceInDays,
  format,
  isAfter,
  isBefore,
  parseISO,
} from "date-fns";
import supabase from "../services/supabase";
export function formatDaysDifference(days: number) {
  const lastDigit = days % 10;
  const lastTwoDigits = days % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `через ${days} день`;
  } else if (
    lastDigit >= 2 &&
    lastDigit <= 4 &&
    !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
  ) {
    return `через ${days} дня`;
  } else {
    return `через ${days} дней`;
  }
}
export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const hasTime = dateString.includes("T");
  return hasTime
    ? format(date, "dd.MM.yyyy HH:mm:ss")
    : format(date, "dd.MM.yyyy");
}
export function daysDifference(startDate: string, endDate: string) {
  const date1 = parseISO(startDate);
  const date2 = parseISO(endDate);
  console.log(date1, date2);
  return differenceInDays(date2, date1);
}
export function checkDate(startDate: string, endDate: string) {
  const eventStart = parseISO(startDate);
  const eventEnd = parseISO(endDate);
  const now = new Date();

  if (isAfter(now, eventEnd)) {
    return `${formatDate(startDate)} — ${formatDate(endDate)}`;
  }
  if (isBefore(now, eventStart)) {
    return differenceInDays(startDate, now) === 0
      ? "Начнется завтра!"
      : `Начнется ${formatDaysDifference(differenceInDays(startDate, now))} `;
  }
  if (isAfter(now, eventStart) && isBefore(now, eventEnd))
    return `Закончится через ${formatDaysDifference(
      daysDifference(startDate, endDate)
    )}`;
}
export function formatCurrency(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(value);
}
export function chechToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
export async function uploadFile(
  file: File,
  fileName: string,
  bucketName: string
) {
  const { data, error: storageError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);
  if (storageError)
    throw new Error(`Ошибка при загрузке файла ${fileName} в ${bucketName}`);

  return data;
}
export function formatDateToCustomISO(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  const timezoneOffset = date.getTimezoneOffset();
  const offsetHours = String(
    Math.abs(Math.floor(timezoneOffset / 60))
  ).padStart(2, "0");
  const offsetMinutes = String(Math.abs(timezoneOffset % 60)).padStart(2, "0");
  const sign = timezoneOffset > 0 ? "-" : "+";

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${offsetHours}:${offsetMinutes}`;
}

export function calculateEndDate(
  firstDate: string | Date,
  durationInDays: number
) {
  let date = new Date(firstDate);
  date.setDate(date.getDate() + durationInDays);

  date.setHours(0, 0, 0, 0);

  return date;
}
export function capitalizeFirstLetter(string: string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export const getToday = function (options: { end?: boolean } = {}) {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
};
