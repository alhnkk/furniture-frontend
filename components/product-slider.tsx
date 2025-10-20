import { MarqueeEffect } from "@/components/ui/marquee-effect";
import { Product } from "@/types";
import Image from "next/image";

export default function ProductSlider({ data }: { data: Product[] }) {
  // Sadece öne çıkarılan ürünleri filtrele
  const featuredProducts = data?.filter((product) => product.isFeatured);

  if (!featuredProducts || featuredProducts.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <div className="grow">
        <MarqueeEffect gap={24}>
          {featuredProducts.map((product) => {
            // İlk görseli al (varsa)
            const mainImage = product.images?.[0];

            return (
              <div key={product.id} className="relative group">
                {mainImage?.url ? (
                  <Image
                    src={mainImage.url.replace(
                      "/upload/",
                      "/upload/f_webp,q_auto:eco,w_300,h_300,c_fill,g_center,fl_progressive/"
                    )}
                    alt={product.name || "Öne Çıkan Ürün"}
                    className="w-64 aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                    width={300}
                    height={300}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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
