import { Billboard as BillboardType } from "@/types";
import HeaderClient from "./header-client";

interface HeaderProps {
  data: BillboardType[];
}

const Header = ({ data }: HeaderProps) => {
  return <HeaderClient data={data} />;
};

export default Header;
