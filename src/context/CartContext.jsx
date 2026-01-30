import React, { useContext, createContext, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  const [product, setProduct] = useState([]);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  }

  return (
    <CartContext.Provider value={{product, setProduct, cart, setCart, addToCart}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider;
