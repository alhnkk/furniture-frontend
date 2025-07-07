import { MarqueeEffect } from "@/components/ui/marquee-effect";
import { Product } from "@/types";
import Image from "next/image";

export default function ProductSlider({ data }: { data: Product[] }) {
  // Debug için kontroller
  console.log("Tüm ürünler:", data?.length);
  console.log("Featured ürünler:", data?.filter((p) => p.isFeatured)?.length);
  console.log(
    "Resimli ürünler:",
    data?.filter((p) => p.images?.length > 0)?.length
  );

  // Sadece öne çıkarılan ürünleri filtrele
  const featuredProducts = data?.filter((product) => product.isFeatured);

  if (!featuredProducts || featuredProducts.length === 0) {
    console.log("Öne çıkarılan ürün bulunamadı");
    return null;
  }

  return (
    <div className="py-8">
      <div className="grow">
        <MarqueeEffect gap={24}>
          {featuredProducts.map((product) => {
            // Her ürün için debug
            console.log(
              "Ürün:",
              product.name,
              "Featured:",
              product.isFeatured,
              "Images:",
              product.images?.length
            );

            // İlk görseli al (varsa)
            const mainImage = product.images?.[0];

            return (
              <div key={product.id} className="relative group">
                {mainImage?.url ? (
                  <Image
                    src={mainImage.url.replace(
                      "/upload/",
                      "/upload/q_auto,f_auto,w_200,h_200,c_fill/"
                    )}
                    alt={product.name || "Öne Çıkan Ürün"}
                    className="w-64 aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                    width={300}
                    height={300}
                  />
                ) : (
                  <div className="w-32 h-32 bg-stone-200 rounded-md flex items-center justify-center">
                    <p className="text-stone-400 text-sm text-center px-2">
                      Görsel Yok
                    </p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-center justify-center">
                  <p className="text-white text-sm text-center px-2 font-medium">
                    {product.name}
                  </p>
                </div>
              </div>
            );
          })}
        </MarqueeEffect>
      </div>
    </div>
  );
}
