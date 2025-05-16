import {
  Navigate,
  useLocation,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import styles from "./ProductsShowcase.module.css";
import Button from "../../Components/Button/Button";

const ProductsShowcase = () => {
  const { itemList } = useOutletContext();

  // Checks the URL for which item to render
  const navigate = useNavigate();
  const location = useLocation();
  const pathOfProductInFocus = location.pathname.split("/").pop();
  const productInFocus = itemList.filter(
    (item) => item.routePath === pathOfProductInFocus
  );

  const item = itemList.filter((item) => item.sort === productInFocus[0].sort);

  const productBranch = item.find((item) => item.product === "branch") || "";
  const productSeed = item.find((item) => item.product === "seed") || "";
  const productBasket = item.find((item) => item.product === "basket") || "";
  const productPlanks = item.find((item) => item.product === "planks") || "";

  return (
    <>
      <div className={styles.productsShowcaseRootContainer}>
        <section className={styles.productsShowcaseContainer}>
          {/* Main Product */}
          {item[0] && (
            <div className={styles.productContainer}>
              <h1 className={styles.productHeading}>{`${item[0].name}`}</h1>
              <img
                src={item[0].imageUrl}
                alt={`Image of ${item[0].name}`}
                className={styles.productImage}
              />
            </div>
          )}

          <div className={styles.subProductsContainer}>
            {/* Branch */}
            {productBranch && (
              <div
                className={`${styles.branchContainer} ${styles.itemContainer}`}
              >
                <div className={styles.titleImageContainer}>
                  <h2>{productBranch.name}</h2>
                  <img
                    src={productBranch.imageUrl}
                    alt={`Image of ${productSeed.name} branch`}
                    className={styles.productImage}
                  />
                </div>
                <div>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla repellat, ex officia sit accusantium perspiciatis
                    atque quidem? Quaerat, aut sequi.
                  </p>
                </div>
              </div>
            )}

            {/* Seed */}
            {productSeed && (
              <div
                className={`${styles.seedContainer} ${styles.itemContainer}`}
              >
                <div className={styles.titleImageContainer}>
                  <h2>{productSeed.name}</h2>
                  <img
                    src={productSeed.imageUrl}
                    alt={`Image of ${productSeed.name} seed`}
                    className={styles.productImage}
                  />
                </div>
                <div>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla repellat, ex officia sit accusantium perspiciatis
                    atque quidem? Quaerat, aut sequi.
                  </p>
                </div>
              </div>
            )}

            {/* Basket */}
            {productBasket && (
              <div
                className={`${styles.basketContainer} ${styles.itemContainer}`}
              >
                <div className={styles.titleImageContainer}>
                  <h2>{productBasket.name}</h2>
                  <img
                    src={productBasket.imageUrl}
                    alt={`Image of ${productBasket.name} basket`}
                    className={styles.productImage}
                  />
                </div>

                <div>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla repellat, ex officia sit accusantium perspiciatis
                    atque quidem? Quaerat, aut sequi.
                  </p>
                </div>
              </div>
            )}

            {/* Planks */}
            {productPlanks && (
              <div
                className={`${styles.planksContainer} ${styles.itemContainer}`}
              >
                <div className={styles.titleImageContainer}>
                  <h2>{productPlanks.name}</h2>
                  <img
                    src={productPlanks.imageUrl}
                    alt={`Image of ${productPlanks.name} plank`}
                    className={styles.productImage}
                  />
                </div>

                <div>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Nulla repellat, ex officia sit accusantium perspiciatis
                    atque quidem? Quaerat, aut sequi.
                  </p>
                </div>
              </div>
            )}

            {/* Go to Store Button */}
            <div className={styles.buttonContainer}>
              <Button onClick={() => navigate("/product-store")}>
                Go to Store
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ProductsShowcase;
