import { Category } from "@/types";
import CategoryListClient from "./category-list-client";

interface CategoryListProps {
  data: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-800 to-amber-800" />
          <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 bg-clip-text text-transparent py-2">
            KATEGORİLER
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-amber-800 to-amber-800" />
        </div>
        <div className="text-center text-stone-600">
          Henüz kategori bulunmamaktadır.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-800 to-amber-800" />
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 bg-clip-text text-transparent py-2">
          KATEGORİLER
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-amber-800 to-amber-800" />
      </div>
      <CategoryListClient data={data} />
    </div>
  );
};

export default CategoryList;
