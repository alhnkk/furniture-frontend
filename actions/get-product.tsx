import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (): Promise<Product[]> => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn("NEXT_PUBLIC_API_URL tanımlanmamış, boş array döndürülüyor");
      return [];
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(URL, {
      next: { revalidate: 1800 }, // 30 dakika cache
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn("Products API yanıt vermedi, boş array döndürülüyor");
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn("Products API hatası, boş array döndürülüyor:", error);
    return [];
  }
};

export default getProduct;
