import { Category } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(URL, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Kategori verisi alınamadı");
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
    return [];
  }
};

export default getCategories;
