import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { MotionDiv, MotionH2, MotionP } from "@/lib/motion";

export default function About() {
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

  const slideFromLeft = {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const slideFromRight = {
    hidden: {
      opacity: 0,
      x: 100,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <MotionDiv
      id="about"
      className="container mx-auto px-4 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Sol Taraf - İçerik */}
        <MotionDiv
          className="space-y-8 order-2 lg:order-1"
          variants={slideFromLeft}
        >
          <div className="space-y-6">
            <MotionDiv className="flex items-center mb-12" variants={fadeInUp}>
              <MotionH2
                className="text-4xl font-bold text-center bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 bg-clip-text text-transparent py-2"
                variants={fadeInUp}
              >
                DERYA MİMARLIK TASARIM
              </MotionH2>
              <MotionDiv
                className="hidden lg:block h-[1px] w-24 bg-gradient-to-l from-transparent via-amber-800 to-amber-800"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
              />
            </MotionDiv>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <MotionP className="text-lg font-medium" variants={fadeInUp}>
                Derya Mimarlık Tasarım, estetik ile fonksiyonelliği buluşturan
                özgün projeleriyle yaşam alanlarına değer katmayı amaçlayan bir
                iç mimarlık ve tasarım ofisidir. Modern çizgilerle klasik
                detayları ustalıkla harmanlayan ekibimiz; konut, ofis, mağaza,
                otel ve ticari alanlar gibi birçok farklı mekânda yenilikçi
                çözümler sunar. Her projeye özgü kişiselleştirilmiş tasarımlar
                geliştirerek, müşterilerimizin ihtiyaçlarını ve hayallerini
                gerçeğe dönüştürmeyi ilke ediniriz. Derya Mimarlık Tasarım
                olarak, sürdürülebilirlikten ödün vermeden, zarif, işlevsel ve
                çağdaş mekânlar yaratıyoruz.
              </MotionP>
              <MotionP className="text-lg font-medium" variants={fadeInUp}>
                Modern tasarım anlayışımızı geleneksel değerlerle harmanlayarak,
                zamansız ve şık çözümler sunuyoruz.
              </MotionP>
            </div>
          </div>

          {/* İstatistik Kartları */}
          <MotionDiv
            className="grid grid-cols-3 gap-6"
            variants={containerVariants}
          >
            <MotionDiv variants={cardVariants}>
              <Card className="border border-amber-200/50 shadow bg-gradient-to-br from-amber-50 to-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-amber-800 mb-2">
                    20+
                  </div>
                  <div className="text-gray-600 font-medium">
                    Yıllık Deneyim
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            <MotionDiv variants={cardVariants}>
              <Card className="border border-amber-200/50 shadow bg-gradient-to-br from-amber-50 to-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center mr-2">
                  <div className="text-4xl font-bold text-amber-800 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600 font-medium">
                    Tamamlanan Proje
                  </div>
                </CardContent>
              </Card>
            </MotionDiv>

            <MotionDiv variants={cardVariants}>
              <Card className="border border-amber-200/50 shadow bg-gradient-to-br from-amber-50 to-white hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold text-amber-800 mb-2">
                    500+
                  </div>
                  <div className="text-gray-600 font-medium">Mutlu Müşteri</div>
                </CardContent>
              </Card>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>

        {/* Sağ Taraf - Resim */}
        <MotionDiv
          className="relative order-1 lg:order-2 group"
          variants={slideFromRight}
        >
          <div className="relative p-[3px] rounded-xl overflow-hidden bg-amber-600/5 shadow-sm">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#7c2d12_0deg,transparent_60deg,transparent_300deg,#7c2d12_360deg)] animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-amber-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            <div className="relative h-full bg-white rounded-lg">
              <div className="aspect-[4/3] relative p-6">
                <Image
                  src="/mockup.jpeg"
                  alt="About Derya Tasarım"
                  fill
                  className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </MotionDiv>
      </div>
    </MotionDiv>
  );
}
