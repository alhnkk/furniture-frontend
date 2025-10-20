import { Settings } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/settings`;

const getSettings = async (): Promise<Settings> => {
  try {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      console.warn(
        "NEXT_PUBLIC_API_URL tanımlanmamış, fallback data kullanılıyor"
      );
      return getFallbackSettings();
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const res = await fetch(URL, {
      next: { revalidate: 86400 }, // 24 saat cache (settings çok nadiren değişir)
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn("Settings API yanıt vermedi, fallback data kullanılıyor");
      return getFallbackSettings();
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.warn("Settings API hatası, fallback data kullanılıyor:", error);
    return getFallbackSettings();
  }
};

const getFallbackSettings = (): Settings => ({
  id: "",
  siteName: "Derya Mimarlık Tasarım",
  metaData: {
    title: "Derya Mimarlık Tasarım",
    description:
      "Derya Mimarlık Tasarım - Profesyonel mimarlık ve tasarım hizmetleri",
    keywords: ["mimarlık", "tasarım", "mobilya", "iç mimarlık"],
  },
  contactInfo: {
    address: "",
    phone: "",
    email: "",
  },
  socialMedia: {
    facebook: "",
    instagram: "",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export default getSettings;
