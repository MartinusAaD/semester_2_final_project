import { Outlet, useParams } from "react-router-dom";
import NavbarProductInfo from "../../Components/NavbarProductInfo/NavbarProductInfo";
import { useState } from "react";
import { productItems } from "../../assets/productData";

const ProductInfo = () => {
  const [itemList, setItemList] = useState(productItems);

  return (
    <>
      <NavbarProductInfo />
      {/* Passing of "props" through Outlet suggested by ChatGPT */}
      <Outlet context={{ itemList }} />
    </>
  );
};

export default ProductInfo;
