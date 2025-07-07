import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";


export default function About() {
  return (
    <div id="about" className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Sol Taraf - İçerik */}
        <div className="space-y-8 order-2 lg:order-1">
          <div className="space-y-6">
            <div className="flex items-center mb-12">
              <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 bg-clip-text text-transparent py-2">
                DERYA MİMARLIK TASARIM
              </h2>
              <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-amber-800 to-amber-800" />
            </div>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p className="text-lg font-medium">
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
              </p>
              <p className="text-lg font-medium">
                Modern tasarım anlayışımızı geleneksel değerlerle harmanlayarak,
                zamansız ve şık çözümler sunuyoruz.
              </p>
            </div>
          </div>

          {/* İstatistik Kartları */}
          <div className="grid grid-cols-3 gap-6">
            <Card className="border border-amber-200/50 shadow bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-amber-800 mb-2">
                  20+
                </div>
                <div className="text-gray-600 font-medium">Yıllık Deneyim</div>
              </CardContent>
            </Card>
            <Card className="border border-amber-200/50 shadow bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-amber-800 mb-2">
                  1000+
                </div>
                <div className="text-gray-600 font-medium">
                  Tamamlanan Proje
                </div>
              </CardContent>
            </Card>
            <Card className="border border-amber-200/50 shadow bg-gradient-to-br from-amber-50 to-white">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-amber-800 mb-2">
                  1000+
                </div>
                <div className="text-gray-600 font-medium">Mutlu Müşteri</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sağ Taraf - Resim */}
        <div className="relative order-1 lg:order-2 group">
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
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
