"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Billboard } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";

interface HeaderClientProps {
  data: Billboard[];
}

const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!data.length) {
    return (
      <div className="relative w-full aspect-[2.4/1] bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Görüntülenecek billboard bulunamadı</p>
      </div>
    );
  }

  return (
    <div id="home" className="overflow-hidden relative group"> 
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 15000,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={item.id}>
              <div className="relative aspect-[2.4/1] w-full h-[360px] lg:h-[720px] overflow-hidden">
                <div className="absolute inset-0 z-10">
                  <Image
                    src={
                      item.image?.url.replace(
                        "/upload/",
                        "/upload/q_auto,f_auto,w_1920,h_800,c_fill/"
                      ) || ""
                    }
                    alt={item.label || "Billboard görüntüsü"}
                    className="object-cover h-[360px] lg:h-[720px] brightness-[0.92] contrast-[1.05] saturate-[1.05]"
                    width={1920}
                    height={720}
                    priority
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-black/20">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                  </div>
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.15)]" />
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                </div>

                {index === current && (
                  <div className="absolute bottom-28 left-28 max-w-5xl space-y-6 z-20">
                    {item.description && (
                      <div className="font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1]">
                        {item.description.split(" ").map((word, i) => (
                          <span 
                            key={i}
                            className="inline-block mr-[0.2em] last:mr-0 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                          >
                            {word}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-white/90 text-xl sm:text-2xl font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] max-w-3xl">
                      {item.label}
                    </div>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {data.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === current ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border-none backdrop-blur-sm"
          onClick={() => api?.scrollPrev()}
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border-none backdrop-blur-sm"
          onClick={() => api?.scrollNext()}
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </Button>
      </Carousel>
    </div>
  );
};

export default HeaderClient;
