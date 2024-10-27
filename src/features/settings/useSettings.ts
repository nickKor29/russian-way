import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSettings() {
  const { data: settings, isPending: isGettingSettings } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isGettingSettings, settings };
}
