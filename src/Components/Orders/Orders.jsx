import React, { useEffect, useState } from "react";
import styles from "./Orders.module.css";
import { database } from "../../firestoreConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getAuthContext } from "../../context/authContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const { user } = getAuthContext();

  useEffect(() => {
    const fetchUsersOrders = async () => {
      if (!user) {
        return;
      }

      try {
        const ordersRef = collection(database, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        ); // where/orderBy Suggested by ChatGpt for finding specific orders by user and date in firebase
        const querySnapshot = await getDocs(q);

        const fetchedOrders = querySnapshot.docs.map((doc) => ({
          orderId: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedOrders);

        setOrders(fetchedOrders);
      } catch (error) {
        console.log(error.message);
        setFeedbackMessage(
          "There was an issue loading your orders, try again later",
          error.message
        );
      }
    };
    fetchUsersOrders();
  }, []);

  return (
    <div className={styles.ordersWrapper}>
      <div className={styles.ordersContainer}>
        <ul className={styles.listRowTitle}>
          <li
            className={`${styles.listColumnTitle} ${styles.listItemDate}`}
            title="The date of the order"
          >
            Order Date
          </li>
          <li
            className={`${styles.listColumnTitle} ${styles.listItemOrderId}`}
            title="The orders unique number"
          >
            Order Number
          </li>
          <li
            className={`${styles.listColumnTitle} ${styles.listItemProducts}`}
            title="A list of the products ordered"
          >
            Products
          </li>
          <li
            className={`${styles.listColumnTitle} ${styles.listItemPrice}`}
            title="The total price of the order"
          >
            Price
          </li>
        </ul>

        {/* Error Message */}
        {feedbackMessage && (
          <h1 className={styles.feedbackMessage}>{feedbackMessage}</h1>
        )}

        {/*  */}
        {orders.map((order) => (
          <ul className={styles.productList} key={order.orderId}>
            <li className={`${styles.productListItem} ${styles.listItemDate}`}>
              {order.createdAt.toDate().toLocaleDateString()}
            </li>
            <li
              className={`${styles.productListItem} ${styles.listItemOrderId}`}
            >
              {order.orderId}
            </li>
            <li
              className={`${styles.productListItem} ${styles.listItemProducts}`}
            >
              {order.orderProducts
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((product) => (
                  <div className={styles.productsContainer} key={product.id}>
                    <p>{product.name}</p>
                    <p>x{product.cartQuantity}</p>
                  </div>
                ))}
            </li>
            <li className={`${styles.productListItem} ${styles.listItemPrice}`}>
              {order.priceDetails.totalPrice} {order.priceDetails.currencyType}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Orders;
