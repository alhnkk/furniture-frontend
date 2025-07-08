import Image from "next/image";
import { MotionDiv, MotionH2, MotionH3 } from "@/lib/motion";

const categories = [
  {
    id: "1",
    name: "Mutfak",
    image: "/categories/kitchen.jpg",
  },
  {
    id: "2",
    name: "Banyo",
    image: "/categories/bathroom.jpg",
  },
  {
    id: "3",
    name: "Yatak Odası",
    image: "/categories/bedroom.jpg",
  },
  {
    id: "4",
    name: "Oturma Odası",
    image: "/categories/living-room.jpg",
  },
];

export default function Categories() {
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
          >
            <Image
              src={category.image}
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
