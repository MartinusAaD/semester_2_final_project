import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { getAuthContext } from "../../context/authContext";
import { getCartContext } from "../../context/cartContext";
import styles from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import countReducer from "../../reducers/countReducer";
import { useMemo, useReducer } from "react";

const Cart = () => {
  const { cart, dispatch } = getCartContext();
  const { user } = getAuthContext();
  const navigate = useNavigate();

  const [count, countDispatch] = useReducer(countReducer, 1);

  const handleIncreaseAmount = (item) => {
    dispatch({ type: "INCREASE_QUANTITY", payload: item.id });
  };

  const handleDecreaseAmount = (item) => {
    if (item.cartQuantity > 1) {
      dispatch({ type: "DECREASE_QUANTITY", payload: item.id });
    } else {
      dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleCheckout = () => {
    if (user) {
      navigate("/checkout");
    } else {
      // modal for continue as guest, or sign in for order history.
    }
  };

  const productTotalPrice = (item) => {
    const price = item.price * item.cartQuantity;
    return price.toFixed(2);
  };

  const totalPrice = useMemo(() => {
    return cart
      .reduce((total, item) => total + item.price * item.cartQuantity, 0)
      .toFixed(2);
  }, [cart]);

  return (
    <div className={styles.cartWrapper}>
      <div className={styles.cartContainer}>
        <h1 className={styles.header}>Cart</h1>
        <div className={styles.cart}>
          {cart.map((item) => (
            <section className={styles.cartItem} key={item.id}>
              <div className={styles.imageContainer}>
                <img
                  src={item.imageUrl}
                  alt=""
                  className={styles.productImage}
                />
              </div>
              {/* Info */}
              <div className={styles.productInfoContainer}>
                <h2 className={styles.productName}>{item.name}</h2>
                <div className={styles.productPriceContainer}>
                  <p className={styles.priceText}>Price each: </p>
                  <p className={styles.priceNumber}>{item.price}$ USD</p>
                </div>
                <div className={styles.productPriceContainer}>
                  <p className={styles.priceText}>Price total: </p>
                  <p className={styles.priceNumber}>
                    {productTotalPrice(item)}$ USD
                  </p>
                </div>
              </div>
              {/* Tools */}
              <div className={styles.toolsContainer}>
                <div className={styles.buttonContainer}>
                  <Button
                    className={styles.toolsButton}
                    onClick={() => handleDecreaseAmount(item)}
                  >
                    -
                  </Button>
                  <p className={styles.cartQuantity}>{item.cartQuantity}</p>
                  <Button
                    className={styles.toolsButton}
                    onClick={() => handleIncreaseAmount(item)}
                  >
                    +
                  </Button>
                  <Button
                    className={`${styles.toolsButton} ${styles.removeProductButton}`}
                    onClick={() => handleRemoveProduct(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </div>
              </div>
            </section>
          ))}
        </div>
        {/* Total Price */}
        <div className={styles.totalPriceContainer}>
          <h2 className={styles.totalPriceHeader}>Total Price:</h2>
          <h2 className={styles.totalPriceHeader}>{totalPrice}$ USD</h2>
        </div>
        <Button className={styles.checkoutButton} onClick={handleCheckout}>
          To Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
