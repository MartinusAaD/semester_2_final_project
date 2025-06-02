import { useNavigate } from "react-router-dom";
import Button from "../../Components/Button/Button";
import { getAuthContext } from "../../context/authContext";
import { getCartContext } from "../../context/cartContext";
import styles from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import useCurrencyConverter from "../../hooks/useCurrencyConverter";
import CurrencyConverter from "../../Components/currencyConverter/CurrencyConverter";
import CheckoutModal from "../../Components/CheckoutModal/CheckoutModal";

const Cart = () => {
  const { cart, dispatch, totalPrice, currencyType, setCurrencyType } =
    getCartContext();
  const { user } = getAuthContext();

  const { rates } = useCurrencyConverter();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const navigate = useNavigate();

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
    if (cart.length === 0) {
      console.log("cart is empty");
      return;
    }

    if (user) {
      navigate("/checkout");
      setShowCheckoutModal(false);
    } else {
      setShowCheckoutModal(true);
    }
  };

  const priceConversion = (item) => {
    if (!rates || !currencyType || !rates[currencyType]) return "0.00"; // Got help with this line from chatGPT, rates had not rendered fast enough, site crashed.

    const convertedPrice = item.price * rates[currencyType];
    return convertedPrice.toFixed(2);
  };

  const productTotalPrice = (item) => {
    if (!rates || !currencyType || !rates[currencyType]) return "0.00"; // Got help with this line from chatGPT, rates had not rendered fast enough, site crashed.

    const basePrice = item.price * item.cartQuantity;
    const convertedPrice = basePrice * rates[currencyType];
    return convertedPrice.toFixed(2);
  };

  const cartTotalPrice = useMemo(() => {
    if (!rates || !currencyType || !rates[currencyType]) return "0.00"; // Got help with this line from chatGPT, rates had not rendered fast enough, site crashed.

    const convertedCartPrice = totalPrice * rates[currencyType];
    return convertedCartPrice.toFixed(2);
  }, [totalPrice, currencyType, rates]);

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
                  <p className={styles.priceNumber}>
                    {priceConversion(item)} {currencyType}
                  </p>
                </div>
                <div className={styles.productPriceContainer}>
                  <p className={styles.priceText}>Price total: </p>
                  <p className={styles.priceNumber}>
                    {productTotalPrice(item)} {currencyType}
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
          <h2 className={styles.totalPriceHeader}>
            {cartTotalPrice}
            {/* Currency Converter */}
            <CurrencyConverter
              setCurrencyType={setCurrencyType}
              selectStyles={styles.currencyConverterSelect}
            />
          </h2>
        </div>

        {/* Hide Checkout button if cart is empty */}
        {cart.length !== 0 && (
          <Button className={styles.checkoutButton} onClick={handleCheckout}>
            To Checkout
          </Button>
        )}
      </div>

      {/* Open Checkout Modal if user is not logged in */}
      {showCheckoutModal && (
        <CheckoutModal setShowCheckoutModal={setShowCheckoutModal} />
      )}
    </div>
  );
};

export default Cart;
