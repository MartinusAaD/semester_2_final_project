import styles from "./App.module.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { productItems } from "./assets/productData";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  const [itemList, setItemList] = useState(productItems);

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
