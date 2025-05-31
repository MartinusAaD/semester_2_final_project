import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./ProductStore.module.css";
import { useEffect, useReducer, useState } from "react";
import countReducer from "../../reducers/countReducer";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Components/Button/Button";
import { getProductsContext } from "../../context/productsContext";
import { getCartContext } from "../../context/cartContext";
import CurrencyConverter from "../../Components/currencyConverter/CurrencyConverter";
import useCurrencyConverter from "../../hooks/useCurrencyConverter";

const ProductStore = () => {
  const { products } = getProductsContext();

  const [productTypeInFocus, setProductTypeInFocus] = useState("tree");
  const [productSortInFocus, setProductSortInFocus] = useState(
    "Cherry Blossom Tree"
  );
  const [productInFocus, setProductInFocus] = useState(null);

  const [count, countDispatch] = useReducer(countReducer, 1);
  const { cart, dispatch } = getCartContext();

  const [currencyType, setCurrencyType] = useState("USD");
  const { rates } = useCurrencyConverter();

  const navigate = useNavigate();

  // For routing properly
  const [productInfoUrl, setProductInfoUrl] = useState("/product-info");

  // Reset counter to default on product change
  useEffect(() => {
    countDispatch({ type: "RESET", payload: 0 });
  }, [productInFocus]);

  const setActiveClass = ({ isActive }) =>
    `${styles.productTypeContainer} ${isActive ? styles.active : ""}`;

  useEffect(() => {
    setProductInFocus(productSortInFocus);
  }, [productTypeInFocus, productSortInFocus]);

  // When the type of products is changed (Tree, fruit tree, bush), defaults to first object of sort
  useEffect(() => {
    const productSort = products.find(
      (item) => item.product === productTypeInFocus
    );

    if (!productSort) return;

    setProductSortInFocus(productSort);

    switch (productTypeInFocus) {
      case "tree":
        navigate(`${productSort.routePath}/tree`);
        break;

      case "fruitTree":
        navigate(`${productSort.routePath}/fruit-tree`);
        break;

      case "bush":
        navigate(`${productSort.routePath}/bush`);
        break;

      default:
        break;
    }
  }, [productTypeInFocus, products, navigate]);

  // Runs when the sort of product is being changed
  useEffect(() => {
    if (!productSortInFocus) return;

    switch (productSortInFocus.product) {
      case "tree":
        setProductInfoUrl(
          `/product-info/trees/${productSortInFocus.routePath}`
        );
        navigate(`/product-store/${productSortInFocus.routePath}/tree`);
        break;

      case "fruitTree":
        setProductInfoUrl(
          `/product-info/fruit-trees/${productSortInFocus.routePath}`
        );
        navigate(`/product-store/${productSortInFocus.routePath}/fruit-tree`);
        break;

      case "bush":
        setProductInfoUrl(
          `/product-info/berry-bushes/${productSortInFocus.routePath}`
        );
        navigate(`/product-store/${productSortInFocus.routePath}/bush`);
        break;

      default:
        setProductInfoUrl("/product-info");
        break;
    }
  }, [productTypeInFocus, productSortInFocus, navigate]);

  const handleChangeType = (e) => {
    setProductTypeInFocus(e.target.value);
  };

  const handleChangeOfSort = (item) => {
    setProductSortInFocus(item);
  };

  const handleProductInFocus = (item) => {
    setProductInFocus(item);
  };

  const handleAddToCart = async () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        product: productInFocus,
        cartQuantity: count,
      },
    });

    countDispatch({ type: "RESET", payload: 0 });

    // Remove quantity from product
    // Add quantity of product to cart
  };

  const convertPrice = (itemPrice) => {
    if (!rates || !currencyType || !rates[currencyType]) return "0.00"; // Got help with this line from chatGPT, rates had not rendered fast enough, site crashed.

    const basePrice = itemPrice * rates[currencyType];
    return basePrice.toFixed(2);
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
            alt={`Image of ${productSortInFocus?.name ?? "product"}`}
            //onError code by ChatGpt
            onError={(e) => {
              e.target.onerror = null; // prevent infinite loop
              e.target.src = "/images/image-not-found.jpg";
              e.target.alt = `Fallback image of ${
                productSortInFocus?.name ?? "product"
              }`;
            }}
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
              {products
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
                          //onError code by ChatGpt
                          onError={(e) => {
                            e.target.onerror = null; // prevent infinite loop
                            e.target.src = "/images/image-not-found.jpg";
                            e.target.alt = `Fallback image of ${
                              item.name ?? "product"
                            }`;
                          }}
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
              {products.map((item) => {
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
                            //onError code by ChatGpt
                            onError={(e) => {
                              e.target.onerror = null; // prevent infinite loop
                              e.target.src = "/images/image-not-found.jpg";
                              e.target.alt = `Fallback image of ${
                                item.name ?? "product"
                              }`;
                            }}
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
              <p className={styles.quantity}>
                {/* && Object.keys(productInFocus).length > 0 suggested by ChatGPT */}
                {productInFocus && Object.keys(productInFocus).length > 0
                  ? `${productInFocus.quantity ?? 0} Products Left In Store`
                  : "No product selected"}
              </p>

              {/* Price */}
              <p className={styles.price}>
                {productInFocus?.price
                  ? convertPrice(productInFocus.price)
                  : (0).toFixed(2)}{" "}
                <CurrencyConverter
                  setCurrencyType={setCurrencyType}
                  selectStyles={styles.currencyConverterSelect}
                />
              </p>
            </div>

            {/* Purchase */}
            <div className={styles.addToCartContainer}>
              <div className={styles.purchaseAmountContainer}>
                <Button
                  onClick={() =>
                    countDispatch({ type: "DECREMENT", payload: 1 })
                  }
                  className={styles.amountButtons}
                >
                  -
                </Button>

                <p className={styles.count}>{count}</p>
                <Button
                  onClick={() =>
                    countDispatch({ type: "INCREMENT", payload: 1 })
                  }
                  className={styles.amountButtons}
                >
                  +
                </Button>
              </div>

              <Button
                onClick={handleAddToCart}
                className={styles.addToCartButton}
              >
                Add to Cart{" "}
                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {}
    </div>
  );
};

export default ProductStore;
