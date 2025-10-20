import getBillboard from "@/actions/get-billboard";
import getCategories from "@/actions/get-categories";
import About from "@/components/about";
import Header from "@/components/header";
import CategoryList from "@/components/category-list";
import ProductSlider from "@/components/product-slider";
import getProduct from "@/actions/get-product";
import WhatWeDo from "@/components/what-we-do";
import Contact from "@/components/contact";
import getSettings from "@/actions/get-settings";
import Navbar from "@/components/navbar";

export const dynamic = 'force-dynamic';

const HomePage = async () => {
  const billboard = await getBillboard();
  const categories = await getCategories();
  const products = await getProduct();
  const settings = await getSettings();

  return (
    <div>
      <Navbar />
      <Header data={billboard} />
      <div className="flex flex-col gap-4">
        <About data={settings} />
        <CategoryList data={categories} />
        <ProductSlider data={products} />
        <WhatWeDo />
        <Contact
          contactInfo={{
            address: settings.contactInfo?.address || "",
            phone: settings.contactInfo?.phone || "",
            email: settings.contactInfo?.email || "",
          }}
          socialMedia={{
            facebook: settings.socialMedia?.facebook || "",
            instagram: settings.socialMedia?.instagram || "",
          }}
        />
      </div>
    </div>
  );
};

export default HomePage;
