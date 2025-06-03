import styles from "./App.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { productItems } from "./assets/productData";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  const [itemList, setItemList] = useState(productItems);
  const location = useLocation();

  // Scroll to top when page is loaded from other routes
  useEffect(() => {
    const scrollToTop = () => {

      // Keep the page from scrolling up when changing product in the store
      if (!location.pathname.includes("product-store/")) {
        // Smooth or not?
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    scrollToTop();
  }, [location]);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet context={{ itemList }} />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
