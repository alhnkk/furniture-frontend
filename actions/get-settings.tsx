import { Settings } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/settings`;

const getSettings = async (): Promise<Settings> => {
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error("Settings verisi alınamadı");
  }

  const data = await res.json();

  return data;
};

export default getSettings;
