import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firestoreConfig";

const productsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Sorting code retrieved from ChatGPT
        const productsRef = collection(database, "products");
        const productsQuery = query(productsRef, orderBy("name", "asc"));

        const querySnapshot = await getDocs(productsQuery);

        const productsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsList);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <productsContext.Provider value={{ products }}>
      {children}
    </productsContext.Provider>
  );
};

export const getProductsContext = () => useContext(productsContext);
