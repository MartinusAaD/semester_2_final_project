import { addDoc, collection } from "firebase/firestore";
import { database } from "../../firestoreConfig";

const ImportProducts = () => {
  const handleImportProducts = async () => {
    try {
      const response = await fetch("/data/productData.json");
      const products = await response.json();

      for (const product of products) {
        await addDoc(collection(database, "products"), product);
        console.log(`Added: ${product.name}`);
      }

      console.log("All products added successfully!");
    } catch (error) {
      console.error("Error adding products:", error.message);
    }
  };

  return (
    <button onClick={handleImportProducts}>Add Products to Firestore</button>
  );
};

export default ImportProducts;
