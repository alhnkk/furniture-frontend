import { Sofa, Brush, Gem } from "lucide-react";


const services = [
  {
    icon: <Sofa className="w-8 h-8 stroke-[1.5]" />,
    title: "Mobilya Tasarımı",
    subtitle: "Özel Koleksiyon",
    description:
      "Her parçası özenle tasarlanan mobilyalarımız, mekanınıza lüks ve zarafet katıyor. Kişisel zevkinize uygun, benzersiz tasarımlar yaratıyoruz.",
    features: [
      "Özel Tasarım Koltuklar",
      "Modern Yemek Odaları",
      "Lüks Yatak Odaları",
      "Butik Aksesuarlar",
    ],
  },
  {
    icon: <Brush className="w-8 h-8 stroke-[1.5]" />,
    title: "İç Mekan Sanatı",
    subtitle: "Kusursuz Detaylar",
    description:
      "Mekanınızı sanatsal bir vizyonla yeniden yorumluyoruz. Renk, doku ve malzeme seçimleriyle benzersiz ambiyanslar yaratıyoruz.",
    features: [
      "Duvar Dekorasyonu",
      "Aydınlatma Tasarımı",
      "Tekstil Seçimi",
      "Sanat Danışmanlığı",
    ],
  },
  {
    icon: <Gem className="w-8 h-8 stroke-[1.5]" />,
    title: "Lüks Dokunuşlar",
    subtitle: "Premium Detaylar",
    description:
      "En kaliteli malzemeler ve ustalıkla, yaşam alanlarınıza değer katan lüks detaylar ekliyoruz. Her köşe, özenle düşünülmüş tasarım unsurlarıyla bezeniyor.",
    features: [
      "Özel Üretim Parçalar",
      "Altın & Pirinç Detaylar",
      "Mermer Uygulamaları",
      "Deri Döşemeler",
    ],
  },
];

const WhatWeDo = () => {
  return (
    <section id="services" className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-stone-50">
      <div className="container relative mx-auto px-4 max-w-7xl">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-block">
              <span className="text-sm uppercase tracking-[0.2em] text-amber-900/80 font-medium">
                Hizmetlerimiz
              </span>
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-center leading-tight tracking-tight">
                <span>
                  Yaşam Alanlarınız İçin
                </span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
                  <div
                key={index} 
               
                className="group"
              >
                <div className="relative p-[3px] rounded-xl overflow-hidden bg-white shadow-sm">
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#7c2d12_0deg,transparent_60deg,transparent_300deg,#7c2d12_360deg)] opacity-20 animate-[spin_8s_linear_infinite]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-amber-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  <div className="relative h-full bg-white rounded-lg p-6">
                    <div className="flex flex-col space-y-5">
                      <div className="flex items-start justify-between">
                        <div className="p-2.5 rounded-lg bg-gradient-to-br from-amber-50 to-stone-50 text-amber-900 ring-1 ring-amber-900/[0.15]">
                          {service.icon}
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold tracking-tight text-amber-950">
                            {service.title}
                          </h3>
                          <p className="text-amber-800/70 font-medium text-sm">
                            {service.subtitle}
                          </p>
                        </div>
                        <p className="text-stone-600 text-[15px] leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      <ul className="space-y-2 pt-3 border-t border-amber-950/5">
                        {service.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-sm text-stone-600"
                          >
                            <div className="w-1 h-1 rounded-full bg-amber-800/30 mr-2.5" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>  
    </section>
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
