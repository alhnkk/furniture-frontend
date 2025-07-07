import { Product } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/products`;

const getProduct = async (): Promise<Product[]> => {
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error("Product verisi alınamadı");
  }

  const data = await res.json();

  // API'den gelen veriyi doğrudan döndür çünkü artık image objesi olarak geliyor
  return data;
};

export default getProduct;
