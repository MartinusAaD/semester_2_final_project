import { Link, useOutletContext } from "react-router-dom";
import styles from "./Products.module.css";

const Products = () => {
  // Passing of "props" through Outlet suggested by ChatGPT
  const { itemList, itemProperty } = useOutletContext();
  return (
    <div className={styles.productsRootContainer}>
      {itemList
        .filter((item) => item.product === itemProperty)
        .map((item) => {
          return (
            <div className={styles.productContainer}>
              <div className={styles.imageContainer}>
                <img
                  src={item.imageUrl}
                  alt={`Image of ${item.name}`}
                  className={styles.productImage}
                />
              </div>

              <div className={styles.productInfoContainer}>
                <div className={styles.productInfo}>
                  <h1>{item.name}</h1>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                  <p>Lorem ipsum dolor sit amet consectetur.</p>
                </div>
                <div className={styles.moreInfo}>
                  {/* {item.name.toLowerCase().replace(/\s+/g, "-")} - suggested by ChatGPT */}
                  <Link to={`${item.name.toLowerCase().replace(/\s+/g, "-")}`} className={styles.moreInfoButton}>
                    More info!
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Products;
