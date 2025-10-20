import { Suspense } from "react";
import getCategories from "@/actions/get-categories";
import getProduct from "@/actions/get-product";
import ProductsClient from "@/components/products-client";

// ISR - Her 30 dakikada bir (1800 saniye) revalidate et
export const revalidate = 1800;

const ProductsPage = async () => {
  const products = await getProduct();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12 h-full">
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-800 to-amber-800" />
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-amber-950 via-amber-900 to-amber-800 bg-clip-text text-transparent py-2">
          TÜM ÜRÜNLERİMİZ
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-l from-transparent via-amber-800 to-amber-800" />
      </div>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-neutral-600">Ürünler yükleniyor...</p>
            </div>
          </div>
        }
      >
        <ProductsClient products={products} categories={categories} />
      </Suspense>
    </div>
  );
};

export default ProductsPage;
