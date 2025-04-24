import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Importing pages
import Home from "../pages/Home";
import Info from "../pages/Info";
import Product from "../pages/Product";
import Contact from "../pages/Contact";
import Basket from "../pages/Basket";
import Profile from "../pages/Profile";
import PageNotFound from "../pages/PageNotFound";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/info" element={<Info />} />
        <Route path="/product" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </>
  )
);
