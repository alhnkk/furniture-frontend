import { Sofa, Brush, Gem } from "lucide-react";
import {
  MotionDiv,
  MotionH2,
  MotionH3,
  MotionP,
  MotionSpan,
} from "@/lib/motion";

const services = [
  {
    icon: <Sofa className="w-8 h-8 stroke-[1.5]" />,
    title: "Ürünlerimiz",
    subtitle: "Özel Koleksiyon",
    description:
      "Her parçası özenle tasarlanan ürünlerimiz, mekanınıza lüks ve zarafet katıyor. Kişisel zevkinize uygun, benzersiz tasarımlar üretiyoruz.",
    features: [
      "Özel Tasarım Ürünler",
      "Modern Yemek Odaları",
      "Lüks Yatak Odaları",
      "Butik Aksesuarlar",
    ],
  },
  {
    icon: <Brush className="w-8 h-8 stroke-[1.5]" />,
    title: "İç Mekan Sanatı & Tadilat",
    subtitle: "Kusursuz Detaylar",
    description:
      "Mekanınızı sanatsal bir vizyonla yeniden yorumluyoruz. Renk, doku ve malzeme seçimleriyle benzersiz ambiyanslar oluşturuyoruz.",
    features: ["Mimarlık", "Tasarım", "Tamirat", "Tadilat"],
  },
  {
    icon: <Gem className="w-8 h-8 stroke-[1.5]" />,
    title: "Lüks Dokunuşlar",
    subtitle: "Premium Detaylar",
    description:
      "En kaliteli malzemeler ve ustalıkla, yaşam alanlarınıza değer katan lüks detaylar ekliyoruz. Her köşe, özenle düşünülmüş tasarım unsurlarıyla bezeniyor.",
    features: [
      "Özel Üretim Parçalar",
      "Özenle Seçilmiş Renk ve Malzemeler",
      "Lüks ve Kaliteli Ürünler",
    ],
  },
];

const WhatWeDo = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -60,
      scale: 0.8,
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
      y: 80,
      scale: 0.8,
      rotateX: 20,
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

  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const featureVariants = {
    hidden: {
      opacity: 0,
      x: -30,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <MotionDiv
      id="services"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-stone-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container relative mx-auto px-4 max-w-7xl">
        <div className="space-y-16">
          <MotionDiv
            className="text-center space-y-4 max-w-2xl mx-auto"
            variants={titleVariants}
          >
            <div className="inline-block">
              <MotionSpan
                className="text-sm uppercase tracking-[0.2em] text-amber-900/80 font-medium"
                variants={textVariants}
              >
                Hizmetlerimiz
              </MotionSpan>
            </div>
            <div>
              <MotionH2
                className="text-4xl md:text-5xl font-bold text-center leading-tight tracking-tight"
                variants={textVariants}
              >
                <span>Yaşam Alanlarınız İçin</span>
              </MotionH2>
            </div>
          </MotionDiv>

          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {services.map((service, index) => (
              <MotionDiv
                key={index}
                className="group"
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative p-[3px] rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-500">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#7c2d12_0deg,transparent_60deg,transparent_300deg,#7c2d12_360deg)] opacity-20 animate-[spin_8s_linear_infinite]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-amber-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="relative h-full bg-white rounded-lg p-6">
                    <MotionDiv
                      className="flex flex-col space-y-5"
                      variants={contentVariants}
                    >
                      <div className="flex items-start justify-between">
                        <MotionDiv
                          className="p-2.5 rounded-lg bg-gradient-to-br from-amber-50 to-stone-50 text-amber-900 ring-1 ring-amber-900/[0.15] group-hover:scale-110 transition-transform duration-300"
                          variants={iconVariants}
                          whileHover={{
                            rotate: 360,
                            scale: 1.2,
                            transition: { duration: 0.5 },
                          }}
                        >
                          {service.icon}
                        </MotionDiv>
                      </div>

                      <MotionDiv
                        className="space-y-2.5"
                        variants={contentVariants}
                      >
                        <div className="space-y-1">
                          <MotionH3
                            className="text-xl font-semibold tracking-tight text-amber-950"
                            variants={textVariants}
                          >
                            {service.title}
                          </MotionH3>
                          <MotionP
                            className="text-amber-800/70 font-medium text-sm"
                            variants={textVariants}
                          >
                            {service.subtitle}
                          </MotionP>
                        </div>
                        <MotionP
                          className="text-stone-600 text-[15px] leading-relaxed"
                          variants={textVariants}
                        >
                          {service.description}
                        </MotionP>
                      </MotionDiv>

                      <MotionDiv
                        className="space-y-2 pt-3 border-t border-amber-950/5"
                        variants={contentVariants}
                      >
                        {service.features.map((feature, idx) => (
                          <MotionDiv
                            key={idx}
                            className="flex items-center text-sm text-stone-600 group-hover:text-stone-700 transition-colors duration-300"
                            variants={featureVariants}
                            whileHover={{
                              x: 5,
                              color: "#7c2d12",
                              transition: { duration: 0.2 },
                            }}
                          >
                            <MotionDiv
                              className="w-1 h-1 rounded-full bg-amber-800/30 mr-2.5 group-hover:bg-amber-800 transition-colors duration-300"
                              whileHover={{
                                scale: 1.5,
                                backgroundColor: "#7c2d12",
                              }}
                            />
                            {feature}
                          </MotionDiv>
                        ))}
                      </MotionDiv>
                    </MotionDiv>
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </div>
    </MotionDiv>
  );
};

export default WhatWeDo;

// Arka plan için nokta deseni CSS'i globals.css'e eklenecek
/*
.bg-dot-pattern {
  background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
  background-size: 24px 24px;
}
*/
