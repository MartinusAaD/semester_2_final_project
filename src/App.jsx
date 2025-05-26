import styles from "./App.module.css";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { productItems } from "./assets/productData";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ImportProducts from "./Components/ImportProducts/ImportProducts";

function App() {
  const [itemList, setItemList] = useState(productItems);
  const location = useLocation();

  // Scroll to top when page is loaded from other routes
  useEffect(() => {
    scrollToTop();
  }, [location]);

  const scrollToTop = () => {
    // Smooth or not?
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
