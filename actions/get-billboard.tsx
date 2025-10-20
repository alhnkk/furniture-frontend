import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (): Promise<Billboard[]> => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn("NEXT_PUBLIC_API_URL tanımlanmamış, boş array döndürülüyor");
      return [];
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(URL, {
      next: { revalidate: 7200 }, // 2 saat cache (billboard nadiren değişir)
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn("Billboard API yanıt vermedi, boş array döndürülüyor");
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn("Billboard API hatası, boş array döndürülüyor:", error);
    return [];
  }
};

export default getBillboard;
