import {
  Link,
  matchPath,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import styles from "./Products.module.css";
import { useEffect } from "react";
import { getProductsContext } from "../../context/productsContext";

const Products = () => {
  const { products } = getProductsContext();

  // Suggested by ChatGPT to hide content when sub route is active
  const location = useLocation();

  const isShowcaseActive = matchPath(
    `/product-info/:category/:productId`,
    location.pathname
  );

  // Suggested by ChatGPT in order to keep the correct category rendered when
  // clicking "Info" on the main navbar, so it goes back to displaying trees.
  const { category } = useParams();

  const categoryMap = {
    trees: "tree",
    "fruit-trees": "fruitTree",
    "berry-bushes": "bush",
  };

  const itemProperty = categoryMap[category];

  return (
    <>
      <Outlet context={{ products }} />
      {!isShowcaseActive && (
        <div className={styles.productsRootContainer}>
          {products
            .filter((item) => item.product === itemProperty)
            .map((item) => {
              return (
                <section className={styles.productContainer} key={item.id}>
                  <div className={styles.imageContainer}>
                    <img
                      src={item.imageUrl}
                      alt={`Image of ${item.name}`}
                      className={styles.productImage}
                      //onError code by ChatGpt
                      onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = "/images/image-not-found.jpg";
                        e.target.alt = `Fallback image of ${
                          item.name ?? "product"
                        }`;
                      }}
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
                      <Link
                        to={item.routePath}
                        className={styles.moreInfoButton}
                      >
                        More info!
                      </Link>
                    </div>
                  </div>
                </section>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Products;
