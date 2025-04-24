import { Outlet } from "react-router-dom";
import NavbarProductInfo from "../../Components/NavbarProductInfo/NavbarProductInfo";
import { useState } from "react";
import { productItems } from "../../assets/productData";

const ProductInfo = () => {
  const [itemList, setItemList] = useState(productItems);
  const [itemProperty, setItemProperty] = useState("tree");
  return (
    <>
      <NavbarProductInfo setItemProperty={setItemProperty} />
      {/* Passing of "props" through Outlet suggested by ChatGPT */}
      <Outlet context={{ itemList, itemProperty }} />
    </>
  );
};

export default ProductInfo;
