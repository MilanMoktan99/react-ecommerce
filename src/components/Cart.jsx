import React from "react";

const Cart = () => {
  return (
    <>
      {cart.mpa((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Price: {item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </>
  );
};

export default Cart;
