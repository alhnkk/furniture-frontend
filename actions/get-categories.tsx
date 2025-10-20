import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn("NEXT_PUBLIC_API_URL tanımlanmamış, boş array döndürülüyor");
      return [];
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(URL, {
      next: { revalidate: 3600 }, // 1 saat cache
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn("Categories API yanıt vermedi, boş array döndürülüyor");
      return [];
    }

    const data = await res.json();

    // Validate that we received an array
    if (!Array.isArray(data)) {
      return []; 
    }

    // Validate and transform each category
    return data.map((category) => ({
      id: category.id || "",
      name: category.name || "",
      description: category.description || "",
      image: category.image
        ? {
            id: category.image.id || "",
            url: category.image.url || "",
            publicId: category.image.publicId || "",
            createdAt: category.image.createdAt || "",
            updatedAt: category.image.updatedAt || "",
          }
        : undefined,
      imageId: category.imageId || "",
      createdAt: category.createdAt || "",
      updatedAt: category.updatedAt || "",
    }));
  } catch (error) {
    console.warn("Categories API hatası, boş array döndürülüyor:", error);
    return [];
  }
};

export default getCategories;
