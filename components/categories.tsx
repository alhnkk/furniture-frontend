

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
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-12 relative">
        Kategoriler
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-amber-500" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
