import { useOutletContext } from "react-router-dom";
import styles from "./ProductsShowcase.module.css";

const ProductsShowcase = () => {
  const { itemList, productInFocus } = useOutletContext();
  const item = itemList.filter((item) => item.name === productInFocus);

  const productBranch = item.find((item) => item.product === "branch") || "";
  const productSeed = item.find((item) => item.product === "seed") || "";
  const productBasket = item.find((item) => item.product === "basket") || "";
  const productPlanks = item.find((item) => item.product === "planks") || "";

  return (
    <>
      <div className={styles.productsShowcaseRootContainer}>
        <div className={styles.productsShowcaseContainer}>
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

          {/* Branch */}
          {productBranch && (
            <div className={styles.branchContainer}>
              <h2>{`${productBranch.name} - Branch`}</h2>
              <img
                src={productBranch.imageUrl}
                alt={`Image of ${productSeed.name} branch`}
                className={styles.productImage}
              />
            </div>
          )}

          {/* Seed */}
          {productSeed && (
            <div className={styles.seedContainer}>
              <h2>{`${productSeed.name} - Seed`}</h2>
              <img
                src={productSeed.imageUrl}
                alt={`Image of ${productSeed.name} seed`}
                className={styles.productImage}
              />
            </div>
          )}

          {/* Basket */}
          {productBasket && (
            <div className={styles.basketContainer}>
              <h2>{`${productBasket.name} - Basket`}</h2>
              <img
                src={productBasket.imageUrl}
                alt={`Image of ${productBasket.name} basket`}
                className={styles.productImage}
              />
            </div>
          )}

          {/* Planks */}
          {productPlanks && (
            <div className={styles.planksContainer}>
              <h2>{`${productPlanks.name} - Planks`}</h2>
              <img
                src={productPlanks.imageUrl}
                alt={`Image of ${productPlanks.name} plank`}
                className={styles.productImage}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsShowcase;
