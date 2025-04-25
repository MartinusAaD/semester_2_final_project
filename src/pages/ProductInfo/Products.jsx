import {
  Link,
  matchPath,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styles from "./Products.module.css";

const Products = () => {
  // Passing of "props" through Outlet suggested by ChatGPT
  const { itemList } = useOutletContext();

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
  console.log("category:", category, "→ itemProperty:", itemProperty);

  // -----------------------------------------------------

  return (
    <>
      {!isShowcaseActive && (
        <div className={styles.productsRootContainer}>
          {itemList
            .filter((item) => item.product === itemProperty)
            .map((item) => {
              return (
                <div className={styles.productContainer} key={item.id}>
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
                      <Link
                        to={item.routePath}
                        className={styles.moreInfoButton}
                      >
                        More info!
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default Products;
