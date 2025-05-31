import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import { getAuthContext } from "../context/authContext";

// Importing pages
import App from "../App";
import Home from "../pages/Home/Home";
import ProductInfo from "../pages/ProductInfo/ProductInfo";
import ProductStore from "../pages/ProductStore/ProductStore";
import Contact from "../pages/Contact/Contact";
import Cart from "../pages/Cart/Cart";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import MyProfile from "../pages/MyProfile/MyProfile";

import Products from "../pages/ProductInfo/Products";
import ProductsShowcase from "../pages/ProductInfo/ProductsShowcase";

import PageNotFound from "../pages//PageNotFound/PageNotFound";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";
import Checkout from "../pages/Checkout/Checkout";

// -----------------------------------------------------------------------

const PrivateRoutesGuard = ({ children }) => {
  const { user, loading } = getAuthContext();

  if (loading) {
    return;
  }

  if (!user) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

const PublicRoutesGuard = ({ children }) => {
  const { user, loading } = getAuthContext();

  if (loading) {
    return;
  }

  if (user) {
    return <Navigate to="/my-profile" />;
  }

  return children;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        {/* Public Routes */}
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
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        <Route
          path="/sign-in"
          element={
            <PublicRoutesGuard>
              <SignIn />
            </PublicRoutesGuard>
          }
        />

        <Route
          path="/sign-up"
          element={
            <PublicRoutesGuard>
              <SignUp />
            </PublicRoutesGuard>
          }
        />

        <Route path="*" element={<PageNotFound />} />

        {/* Private Routes */}
        <Route
          path="/verify-email"
          element={
            <PrivateRoutesGuard>
              <VerifyEmail />
            </PrivateRoutesGuard>
          }
        />
        <Route
          path="/my-profile"
          element={
            <PrivateRoutesGuard>
              <MyProfile />
            </PrivateRoutesGuard>
          }
        >
          <Route path="orders" element={<MyProfile />} />
        </Route>
      </Route>
    </>
  )
);
