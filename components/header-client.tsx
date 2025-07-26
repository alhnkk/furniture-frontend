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
      <div className="relative w-full h-[450px] lg:h-[800px] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Görüntülenecek billboard bulunamadı</p>
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
          {data.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <CarouselItem key={item.id}>
                <div className="relative w-full h-[450px] lg:h-[800px] overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100">
                  {/* Desktop Split Layout */}
                  <div className="hidden lg:flex h-full">
                    {/* Text Section */}
                    <div
                      className={`flex-1 flex items-center justify-center p-12 ${
                        isEven ? "order-1" : "order-2"
                      }`}
                    >
                      {index === current && (
                        <MotionDiv
                          className="max-w-2xl space-y-8"
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          key={`slide-text-${index}`}
                        >
                          {item.description && (
                            <MotionDiv
                              className="font-black text-5xl xl:text-6xl 2xl:text-7xl tracking-tight leading-[1.1]"
                              variants={containerVariants}
                            >
                              {item.description.split(" ").map((word, i) => (
                                <MotionSpan
                                  key={i}
                                  className="inline-block mr-[0.2em] last:mr-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent"
                                  variants={wordVariants}
                                >
                                  {word}
                                </MotionSpan>
                              ))}
                            </MotionDiv>
                          )}

                          <MotionDiv
                            className="text-gray-600 text-xl xl:text-2xl font-medium tracking-wide leading-relaxed"
                            variants={labelVariants}
                          >
                            {item.label}
                          </MotionDiv>
                        </MotionDiv>
                      )}
                    </div>

                    {/* Image Section */}
                    <div
                      className={`flex-1 relative ${
                        isEven ? "order-2" : "order-1"
                      }`}
                    >
                      <div className="absolute inset-0 p-8">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                          <Image
                            src={
                              item.image?.url
                                ? item.image.url.replace(
                                    "/upload/",
                                    "/upload/f_webp,q_auto:eco,w_800,h_600,c_fill,g_center,fl_progressive/"
                                  )
                                : ""
                            }
                            alt={item.label || "Billboard görüntüsü"}
                            className="object-cover w-full h-full brightness-[0.95] contrast-[1.05] saturate-[1.1] transition-transform duration-700 ease-out transform group-hover:scale-105"
                            width={800}
                            height={600}
                            priority={index === 0}
                            fetchPriority={index === 0 ? "high" : "low"}
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />

                          {/* Subtle overlay for better text contrast when needed */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Full-Width Layout */}
                  <div className="lg:hidden relative h-full">
                    <div className="absolute inset-0">
                      <Image
                        src={
                          item.image?.url
                            ? item.image.url.replace(
                                "/upload/",
                                "/upload/f_webp,q_auto:eco,w_800,h_400,c_fill,g_center,fl_progressive/"
                              )
                            : ""
                        }
                        alt={item.label || "Billboard görüntüsü"}
                        className="object-cover w-full h-full brightness-[0.85] contrast-[1.05] saturate-[1.05]"
                        width={800}
                        height={400}
                        priority={index === 0}
                        fetchPriority={index === 0 ? "high" : "low"}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />

                      {/* Mobile overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
                    </div>

                    {/* Mobile text overlay */}
                    {index === current && (
                      <MotionDiv
                        className="absolute bottom-8 left-6 right-6 space-y-4 z-20"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        key={`slide-mobile-${index}`}
                      >
                        {item.description && (
                          <MotionDiv
                            className="font-black text-2xl sm:text-3xl tracking-tight leading-[1.1]"
                            variants={containerVariants}
                          >
                            {item.description.split(" ").map((word, i) => (
                              <MotionSpan
                                key={i}
                                className="inline-block mr-[0.2em] last:mr-0 bg-gradient-to-r from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
                                variants={wordVariants}
                              >
                                {word}
                              </MotionSpan>
                            ))}
                          </MotionDiv>
                        )}

                        <MotionDiv
                          className="text-white/95 text-base sm:text-lg font-medium tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] leading-relaxed"
                          variants={labelVariants}
                        >
                          {item.label}
                        </MotionDiv>
                      </MotionDiv>
                    )}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* Optimized dots indicator - positioned on the right side */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-40">
          {data.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-500 transform hover:scale-125 ${
                index === current
                  ? "bg-gray-800 scale-125 shadow-lg"
                  : "bg-gray-400 hover:bg-gray-600"
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
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-gray-800/10 hover:bg-gray-800/20 border-none backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50"
          onClick={handlePrev}
          disabled={isAnimating}
          aria-label="Önceki slayt"
        >
          <ChevronLeft className="h-8 w-8 text-gray-800" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-gray-800/10 hover:bg-gray-800/20 border-none backdrop-blur-sm transition-all duration-300 hover:scale-110 disabled:opacity-50"
          onClick={handleNext}
          disabled={isAnimating}
          aria-label="Sonraki slayt"
        >
          <ChevronRight className="h-8 w-8 text-gray-800" />
        </Button>
      </Carousel>
    </div>
  );
});

HeaderClient.displayName = "HeaderClient";

export default HeaderClient;
