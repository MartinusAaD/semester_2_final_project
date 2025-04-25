import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";

// Importing pages
import App from "../App";
import Home from "../pages/Home";
import ProductInfo from "../pages/ProductInfo/ProductInfo";
import ProductStore from "../pages/ProductStore";
import Contact from "../pages/Contact";
import Basket from "../pages/Basket";
import Profile from "../pages/Profile";
import PageNotFound from "../pages/PageNotFound";

import Products from "../pages/ProductInfo/Products";
import ProductsShowcase from "../pages/ProductInfo/ProductsShowcase";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/product-info" element={<ProductInfo />}>
          {/* Navigate to suggested by ChatGPT */}
          <Route index element={<Navigate to="trees" replace />} />
          <Route path=":category" element={<Products />}>
            <Route path=":productId" element={<ProductsShowcase />} />
          </Route>
        </Route>
        <Route path="/product-store" element={<ProductStore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </>
  )
);
