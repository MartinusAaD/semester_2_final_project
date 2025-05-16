import {
  Link,
  NavLink,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styles from "./ProductStore.module.css";
import { useEffect, useReducer, useState } from "react";
import countReducer from "../../reducers/countReducer";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const ProductStore = () => {
  const { itemList } = useOutletContext();
  const [productTypeInFocus, setProductTypeInFocus] = useState("tree");
  const [productSortInFocus, setProductSortInFocus] = useState(
    "Cherry Blossom Tree"
  );
  const [productInFocus, setProductInFocus] = useState(null);

  const [count, dispatch] = useReducer(countReducer, 1);

  const { category } = useParams();

  const navigateToPath = useNavigate();

  // For routing properly
  const [productInfoUrl, setProductInfoUrl] = useState("/product-info");

  const scrollToTop = () => {
    // Smooth or not?
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Scroll to top when page is loaded from other routes
  useEffect(() => {
    scrollToTop();
  }, []);

  //

  const setActiveClass = ({ isActive }) =>
    `${styles.productTypeContainer} ${isActive ? styles.active : ""}`;

  useEffect(() => {
    setProductInFocus(productSortInFocus);
  }, [productTypeInFocus, productSortInFocus]);

  // When the type of products is changed (Tree, fruit tree, bush), defaults to first object of sort
  useEffect(() => {
    const productSort = itemList.find(
      (item) => item.product === productTypeInFocus
    );
    setProductSortInFocus(productSort);

    switch (productTypeInFocus) {
      case "tree":
        navigateToPath(`${productSort.routePath}/tree`);
        break;

      case "fruitTree":
        navigateToPath(`${productSort.routePath}/fruit-tree`);
        break;

      case "bush":
        navigateToPath(`${productSort.routePath}/bush`);
        break;

      default:
        break;
    }
  }, [productTypeInFocus, itemList, navigateToPath]);

  // Runs when the sort of product is being changed
  useEffect(() => {
    switch (productSortInFocus.product) {
      case "tree":
        setProductInfoUrl(
          `/product-info/trees/${productSortInFocus.routePath}`
        );
        navigateToPath(`/product-store/${productSortInFocus.routePath}/tree`);

        break;

      case "fruitTree":
        setProductInfoUrl(
          `/product-info/fruit-trees/${productSortInFocus.routePath}`
        );
        navigateToPath(
          `/product-store/${productSortInFocus.routePath}/fruit-tree`
        );
        break;

      case "bush":
        setProductInfoUrl(
          `/product-info/berry-bushes/${productSortInFocus.routePath}`
        );
        navigateToPath(`/product-store/${productSortInFocus.routePath}/bush`);
        break;

      default:
        setProductInfoUrl("/product-info");
        break;
    }
  }, [productTypeInFocus, productSortInFocus, navigateToPath]);

  const handleChangeType = (e) => {
    setProductTypeInFocus(e.target.value);
  };

  const handleChangeOfSort = (item) => {
    setProductSortInFocus(item);
  };

  const handleProductInFocus = (item) => {
    setProductInFocus(item);
  };

  const handleAddToCart = () => {
    dispatch({ type: "RESET", payload: 0 });
    // Remove quantity from product
    // Add quantity of product to cart
  };

  return (
    <div className={styles.rootContainer}>
      <div className={styles.productStoreContainer}>
        <div className={styles.imageContainer}>
          {productInFocus && productInFocus.product && (
            <h1>{productInFocus.name}</h1>
          )}
          <img
            src={productInFocus?.imageUrl}
            alt={`Image of ${productSortInFocus?.name}`}
          />
          {/* More Info */}
          <div className={styles.moreInfoContainer}>
            <Link to={productInfoUrl}>More Info!</Link>
          </div>
        </div>
        <div className={styles.productCategoryContainer}>
          <div className={styles.typeContainer}>
            <label htmlFor="productType">Product Type:</label>
            <select
              name="productType"
              id="productType"
              className={styles.inputSelect}
              onChange={handleChangeType}
            >
              <option value="tree">Trees</option>
              <option value="fruitTree">Fruit Trees</option>
              <option value="bush">Berry Bushes</option>
            </select>
          </div>

          <div className={styles.productsTypeContainer}>
            <h3>Product Sort:</h3>
            <div className={styles.productsContainer}>
              {itemList
                .filter((item) => item.product === productTypeInFocus)
                .map((item) => {
                  return (
                    <div key={item.id}>
                      <NavLink
                        to={item.routePath}
                        className={setActiveClass}
                        onClick={() => handleChangeOfSort(item)}
                      >
                        <img
                          src={item.imageUrl}
                          alt={`Image of ${item.name}`}
                        />
                        <h6>
                          {item.sort.replace("Tree", "").replace("Bush", "")}
                        </h6>
                      </NavLink>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className={styles.productsTypeContainer}>
            <h3>Products:</h3>
            <div className={styles.productsContainer}>
              {itemList.map((item) => {
                if (item.sort === productSortInFocus.sort) {
                  if (
                    !item.product.includes("basket") &&
                    !item.product.includes("branch")
                  ) {
                    return (
                      <div key={item.id}>
                        <NavLink
                          to={`${item.routePath}/${item.product.replace(
                            "fruitTree",
                            "fruit-tree"
                          )}`}
                          className={setActiveClass}
                          onClick={() => handleProductInFocus(item)}
                        >
                          <img
                            src={item.imageUrl}
                            alt={`Image of ${item.name}`}
                          />
                          <h6>
                            {(() => {
                              // Chat GPT suggestion
                              const formatted = item.product.replace(
                                "fruitTree",
                                "fruit Tree"
                              );
                              return (
                                formatted.charAt(0).toUpperCase() +
                                formatted.slice(1)
                              );
                            })()}
                          </h6>
                        </NavLink>
                      </div>
                    );
                  }
                }
              })}
            </div>
          </div>

          {/* Amount and Price */}
          <div className={styles.purchaseContainer}>
            <div className={styles.quantityPriceContainer}>
              {/* Quantity */}
              <p className={styles.price}>
                {/* && Object.keys(productInFocus).length > 0 suggested by ChatGPT */}
                {productInFocus && Object.keys(productInFocus).length > 0
                  ? `${productInFocus.quantity ?? 0} Products Left In Store`
                  : "No product selected"}
              </p>

              {/* Price */}
              <p className={styles.price}>
                {productInFocus?.price ? productInFocus?.price : (0).toFixed(2)}{" "}
                $
              </p>
            </div>

            {/* Purchase */}
            <div className={styles.addToCartContainer}>
              <div className={styles.purchaseAmountContainer}>
                <button
                  onClick={() => dispatch({ type: "DECREMENT", payload: 1 })}
                >
                  -
                </button>
                <p>{count}</p>
                <button
                  onClick={() => dispatch({ type: "INCREMENT", payload: 1 })}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={styles.addToCartButton}
              >
                Add to Cart <FontAwesomeIcon icon={faCartShopping} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStore;
