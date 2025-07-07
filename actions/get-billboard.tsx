import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

const getBillboard = async (): Promise<Billboard[]> => {
  const res = await fetch(URL);

  if (!res.ok) {
    throw new Error("Billboard verisi alınamadı");
  }

  const data = await res.json();

  // API'den gelen veriyi doğrudan döndür çünkü artık image objesi olarak geliyor
  return data;
};

export default getBillboard;
