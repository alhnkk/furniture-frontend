"use client";

import { Category } from "@/types";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface CategoryListClientProps {
  data: Category[];
}

const CategoryListClient: React.FC<CategoryListClientProps> = ({
  data = [],
}) => {
  const [showAll, setShowAll] = useState(false);
  const initialCount = 9;
  const displayedCategories = showAll ? data : data.slice(0, initialCount);

  const getImageUrl = (category: Category) => {
    if (!category.image?.url) return null;
    try {
      return category.image.url.replace(
        "/upload/",
        "/upload/q_auto,f_auto,w_600,h_400,c_fill/"
      );
    } catch {
      return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedCategories.map((category, index) => {
          const imageUrl = getImageUrl(category);

          return (
            <div
              key={category.id || index}
              className="group relative bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-76 w-full overflow-hidden">
                {imageUrl ? (
                  <>
                    <Image
                      src={imageUrl}
                      alt={category.name || "Kategori görseli"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Parlama efekti */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
                      <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-stone-200 flex items-center justify-center">
                    <span className="text-stone-400 text-lg">
                      Görsel bulunamadı
                    </span>
                  </div>
                )}

                {/* Kategori ismi - ortada */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-bold text-white text-center drop-shadow-lg px-4">
                    {category.name || "İsimsiz Kategori"}
                  </h3>
                </div>

                {/* Açıklama - hover durumunda görünür */}
                {category.description && (
                  <div className="absolute inset-0 flex items-center justify-center p-6 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-center font-lato">
                      {category.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Butonlar */}
      <div className="flex items-center justify-center gap-6 mt-12">
        {data.length > initialCount && (
          <div>
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              size="lg"
              className="group border-amber-800/20 hover:bg-amber-50 hover:border-amber-800/30 transition-all duration-300"
            >
              <span className="text-amber-900 group-hover:text-amber-950">
                {showAll ? "Daha Az Göster" : "Tümünü Göster"}
              </span>
              {showAll ? (
                <ChevronUp className="ml-2 h-4 w-4 text-amber-800" />
              ) : (
                <ChevronDown className="ml-2 h-4 w-4 text-amber-800" />
              )}
            </Button>
          </div>
        )}

        <div>
          <Button
            asChild
            variant="link"
            size="lg"
            className="text-amber-900 hover:text-amber-950 hover:no-underline transition-colors duration-300"
          >
            <Link href="/products" className="flex items-center gap-2">
              Tüm Ürünleri Görüntüle
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default CategoryListClient;
