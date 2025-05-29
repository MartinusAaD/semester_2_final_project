import { createContext, useContext, useEffect, useReducer } from "react";

const cartContext = createContext();

const getCartToken = () => {
  let cartToken = localStorage.getItem("theFruitingForest_cartToken");

  if (!cartToken) {
    cartToken = `theFruitingForest_${crypto.randomUUID()}`;
    localStorage.setItem("theFruitingForest_cartToken", cartToken);
  }

  return cartToken;
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { product, cartQuantity } = action.payload;
      const existingItem = state.find((item) => item.id === product.id);

      if (existingItem) {
        return state.map((item) =>
          item.id === product.id
            ? { ...item, cartQuantity: item.cartQuantity + cartQuantity }
            : item
        );
      }
      return [...state, { ...product, cartQuantity }];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_CART":
      return [];

    case "INCREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, cartQuantity: item.cartQuantity + 1 }
          : item
      );

    case "DECREASE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, cartQuantity: Math.max(1, item.cartQuantity - 1) }
          : item
      );

    case "UPDATE_CART":
      return action.payload;

    default:
      return state;
  }
};

// The cart
export const CartProvider = ({ children }) => {
  const cartKey = getCartToken();

  // Solution suggested by chatGpt as the method with useEffect we used in class didn't seem to work here,
  // It would set the cart in local storage as empty before retrieving the data...
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const storedCart = JSON.parse(localStorage.getItem(cartKey));
    return storedCart || [];
  });
  //--------------------------------------------------------------------------------------

  useEffect(() => {
    localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cartKey, cart]);

  return (
    <cartContext.Provider value={{ dispatch, cart }}>
      {children}
    </cartContext.Provider>
  );
};

export const getCartContext = () => useContext(cartContext);
