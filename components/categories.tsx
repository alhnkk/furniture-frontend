"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MotionDiv, MotionH2, MotionH3 } from "@/lib/motion";
import getCategories from "@/actions/get-categories";
import { Category } from "@/types";

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Kategoriler yüklenirken hata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      scale: 0.9,
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.8,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  const handleCategoryClick = (categoryId: string) => {
    router.push(`/products?category=${categoryId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-600">Kategoriler yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-neutral-600">Henüz kategori bulunmuyor.</p>
        </div>
      </div>
    );
  }

  return (
    <MotionDiv
      className="container mx-auto px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <MotionH2
        className="text-3xl font-bold text-center mb-12 relative"
        variants={titleVariants}
      >
        Kategoriler
        <MotionDiv
          className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-amber-500"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </MotionH2>

      <MotionDiv
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        variants={containerVariants}
      >
        {categories.map((category) => (
          <MotionDiv
            key={category.id}
            className="relative h-64 rounded-lg overflow-hidden shadow-lg group cursor-pointer"
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              y: -10,
              transition: { duration: 0.3 },
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCategoryClick(category.id)}
          >
            <Image
              src={category.image?.url || "/mockup.jpeg"}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
            <MotionDiv
              className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/60 transition-colors duration-300"
              whileHover={{
                background: "rgba(0, 0, 0, 0.7)",
              }}
            >
              <MotionH3
                className="text-white text-xl font-semibold transform group-hover:scale-110 transition-transform duration-300"
                variants={textVariants}
                whileHover={{
                  scale: 1.2,
                  color: "#fbbf24",
                  transition: { duration: 0.2 },
                }}
              >
                {category.name}
              </MotionH3>
            </MotionDiv>

            {/* Hover effect border */}
            <MotionDiv
              className="absolute inset-0 border-2 border-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{
                scale: 1,
                opacity: 1,
                transition: { duration: 0.3 },
              }}
            />
          </MotionDiv>
        ))}
      </MotionDiv>
    </MotionDiv>
  );
}
