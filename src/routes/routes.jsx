import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

// Importing pages
import App from "../App";
import Home from "../pages/Home/Home";
import ProductInfo from "../pages/ProductInfo/ProductInfo";
import ProductStore from "../pages/ProductStore/ProductStore";
import Contact from "../pages/Contact/Contact";
import Basket from "../pages/Basket/Basket";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import MyProfile from "../pages/MyProfile/MyProfile";

import Products from "../pages/ProductInfo/Products";
import ProductsShowcase from "../pages/ProductInfo/ProductsShowcase";

import PageNotFound from "../pages//PageNotFound/PageNotFound";

// -----------------------------------------------------------------------

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/product-info" element={<ProductInfo />}>
          <Route index element={<Navigate to="trees" replace />} />
          <Route path=":category" element={<Products />}>
            <Route path=":productId" element={<ProductsShowcase />} />
          </Route>
        </Route>
        <Route path="/product-store" element={<ProductStore />}>
          <Route path=":category" element={<ProductStore />}>
            <Route path=":productId" element={<ProductStore />} />
          </Route>
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </>
  )
);
