import getCategories from "@/actions/get-categories";
import getProduct from "@/actions/get-product";
import ProductsClient from "@/components/products-client";

const ProductsPage = async () => {
  const products = await getProduct();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-800 to-amber-800" />
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 bg-clip-text text-transparent py-2">
          TÜM ÜRÜNLERİMİZ
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-amber-800 to-amber-800" />
      </div>

      <ProductsClient products={products} categories={categories} />
    </div>
  );
};

export default ProductsPage;
