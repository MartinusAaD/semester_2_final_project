import { Outlet, useOutletContext } from "react-router-dom";
import NavbarProductInfo from "../../Components/NavbarProductInfo/NavbarProductInfo";

const ProductInfo = () => {
  const { itemList } = useOutletContext();
  return (
    <>
      <NavbarProductInfo />
      {/* Passing of "props" through Outlet with context suggested by ChatGPT */}
      <Outlet context={{ itemList }} />
    </>
  );
};

export default ProductInfo;
