
const services = [
  {
    id: "1",
    title: "İç Mekan Tasarımı",
    description:
      "Yaşam alanlarınızı estetik ve fonksiyonel bir şekilde tasarlıyoruz.",
    icon: "🏠",
  },
  {
    id: "2",
    title: "Mobilya Tasarımı",
    description:
      "Özel mobilya tasarımları ile mekanlarınıza özgün çözümler sunuyoruz.",
    icon: "🪑",
  },
  {
    id: "3",
    title: "Renovasyon",
    description:
      "Mevcut mekanlarınızı modern ve şık bir görünüme kavuşturuyoruz.",
    icon: "🔨",
  },
  {
    id: "4",
    title: "Danışmanlık",
    description:
      "Profesyonel tasarım danışmanlığı ile projelerinize yön veriyoruz.",
    icon: "💡",
  },
];

export default function Services() {

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 relative">
        Hizmetlerimiz
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-amber-500" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
