import { Billboard as BillboardType } from "@/types";
import HeaderClient from "./header-client";

interface HeaderProps {
  data: BillboardType[];
}

const Header = ({ data }: HeaderProps) => {
  // Preload critical images
  const firstImageUrl = data?.[0]?.image?.url;
  const optimizedImageUrl = firstImageUrl
    ? firstImageUrl.replace(
        "/upload/",
        "/upload/f_webp,q_auto:eco,w_1920,h_768,c_fill,g_center,fl_progressive/"
      )
    : null;

  return (
    <>
      {optimizedImageUrl && (
        <link
          rel="preload"
          as="image"
          href={optimizedImageUrl}
          fetchPriority="high"
        />
      )}
      <HeaderClient data={data} />
    </>
  );
};

export default Header;
