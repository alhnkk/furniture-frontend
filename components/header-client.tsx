"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Billboard } from "@/types";
import Image from "next/image";
import { useEffect, useState, useMemo, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { MotionDiv, MotionSpan } from "@/lib/motion";

interface HeaderClientProps {
  data: Billboard[];
}

const HeaderClient: React.FC<HeaderClientProps> = memo(({ data }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Optimize carousel plugins with useMemo
  const carouselPlugins = useMemo(
    () => [
      Autoplay({
        delay: 15000,
      }),
    ],
    []
  );

  // Optimize carousel options with useMemo
  const carouselOpts = useMemo(
    () => ({
      loop: true,
      align: "start" as const,
    }),
    []
  );

  // Memoize navigation handlers
  const handlePrev = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      api?.scrollPrev();
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [api, isAnimating]);

  const handleNext = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      api?.scrollNext();
      setTimeout(() => setIsAnimating(false), 300);
    }
  }, [api, isAnimating]);

  const handleDotClick = useCallback(
    (index: number) => {
      if (!isAnimating && index !== current) {
        setIsAnimating(true);
        api?.scrollTo(index);
        setTimeout(() => setIsAnimating(false), 300);
      }
    },
    [api, current, isAnimating]
  );

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

  // Animation variants for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const labelVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
      },
    },
  };

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
        opts={carouselOpts}
        plugins={carouselPlugins}
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={item.id}>
              <div className="relative aspect-[2.4/1] w-full h-[360px] lg:h-[768px] overflow-hidden">
                <div className="absolute inset-0 z-10">
                  <Image
                    src={
                      item.image?.url
                        ? item.image.url.replace(
                            "/upload/",
                            "/upload/f_webp,q_auto:eco,w_1920,h_768,c_fill,g_center,fl_progressive/"
                          )
                        : ""
                    }
                    alt={item.label || "Billboard görüntüsü"}
                    className="object-cover h-[360px] lg:h-[768px] brightness-[0.92] contrast-[1.05] saturate-[1.05] transition-transform duration-700 ease-out transform group-hover:scale-105"
                    width={1920}
                    height={768}
                    priority={index === 0}
                    fetchPriority={index === 0 ? "high" : "low"}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />

                  {/* Simplified overlay for better performance */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
                </div>

                {/* Enhanced text animations with Framer Motion */}
                {index === current && (
                  <MotionDiv
                    className="absolute bottom-28 left-28 max-w-5xl space-y-6 z-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    key={`slide-${index}`}
                  >
                    {item.description && (
                      <MotionDiv
                        className="font-black text-3xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1]"
                        variants={containerVariants}
                      >
                        {item.description.split(" ").map((word, i) => (
                          <MotionSpan
                            key={i}
                            className="inline-block mr-[0.2em] last:mr-0 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)]"
                            variants={wordVariants}
                          >
                            {word}
                          </MotionSpan>
                        ))}
                      </MotionDiv>
                    )}

                    <MotionDiv
                      className="text-white/90 text-lg sm:text-2xl font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.2)] max-w-3xl"
                      variants={labelVariants}
                    >
                      {item.label}
                    </MotionDiv>
                  </MotionDiv>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Optimized dots indicator */}
        <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 flex gap-2 z-30">
          {data.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 transform hover:scale-110 ${
                index === current ? "bg-white w-8" : "bg-white/50 w-4"
              }`}
              onClick={() => handleDotClick(index)}
              disabled={isAnimating}
              aria-label={`${index + 1}. slayta git`}
              aria-current={index === current ? "true" : "false"}
            />
          ))}
        </div>

        {/* Optimized navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border-none backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50"
          onClick={handlePrev}
          disabled={isAnimating}
          aria-label="Önceki slayt"
        >
          <ChevronLeft className="h-8 w-8 text-white" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 border-none backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50"
          onClick={handleNext}
          disabled={isAnimating}
          aria-label="Sonraki slayt"
        >
          <ChevronRight className="h-8 w-8 text-white" />
        </Button>
      </Carousel>
    </div>
  );
});

HeaderClient.displayName = "HeaderClient";

export default HeaderClient;
