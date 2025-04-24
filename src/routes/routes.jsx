import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Importing pages
import App from "../App";
import Home from "../pages/Home";
import ProductInfo from "../pages/ProductInfo";
import ProductStore from "../pages/ProductStore";
import Contact from "../pages/Contact";
import Basket from "../pages/Basket";
import Profile from "../pages/Profile";
import PageNotFound from "../pages/PageNotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/product-info" element={<ProductInfo />} />
        <Route path="/product-store" element={<ProductStore />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </>
  )
);
