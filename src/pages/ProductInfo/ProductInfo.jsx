import { Outlet } from "react-router-dom";
import NavbarProductInfo from "../../Components/NavbarProductInfo/NavbarProductInfo";

const ProductInfo = () => {
  return (
    <>
      <NavbarProductInfo />
      <Outlet />
    </>
  );
};

export default ProductInfo;
