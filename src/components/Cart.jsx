import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  // Remove item from cart
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 1) + 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    setCart(updatedCart);
  };

  // Calculate total price
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );

  return (
    <div style={styles.wrapper}>
      <h1 style={styles.heading}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={styles.emptyText}>Your cart is empty.</p>
      ) : (
        <>
          <div style={styles.itemsWrapper}>
            {cart.map((item) => (
              <div key={item.id} style={styles.card}>
                <img src={item.image} alt={item.title} style={styles.image} />

                <div style={styles.details}>
                  <h3 style={styles.title}>{item.title}</h3>
                  <p style={styles.price}>${item.price}</p>

                  {/* Quantity management */}
                  <div style={styles.quantityWrapper}>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => decreaseQty(item.id)}
                    >
                      -
                    </button>
                    <span style={styles.qtyText}>{item.quantity || 1}</span>
                    <button
                      style={styles.qtyBtn}
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    style={styles.removeBtn}
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.totalWrapper}>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button style={styles.checkoutBtn}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

const styles = {
  wrapper: {
    padding: "30px",
    minHeight: "80vh",
    backgroundColor: "#f8fafc",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "28px",
    color: "#111827",
  },

  emptyText: {
    textAlign: "center",
    fontSize: "18px",
    color: "#64748b",
  },

  itemsWrapper: {
    display: "grid",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    display: "flex",
    gap: "20px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    alignItems: "center",
  },

  image: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    borderRadius: "8px",
  },

  details: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  title: {
    margin: "0 0 8px 0",
    fontSize: "16px",
    fontWeight: "600",
    color: "#111827",
  },

  price: {
    margin: "4px 0",
    color: "#2563eb",
    fontWeight: "500",
  },

  quantityWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "4px",
  },

  qtyBtn: {
    width: "28px",
    height: "28px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: "#f1f5f9",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "16px",
  },

  qtyText: {
    minWidth: "20px",
    textAlign: "center",
    fontWeight: "500",
  },

  removeBtn: {
    marginTop: "8px",
    padding: "6px 12px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },

  totalWrapper: {
    textAlign: "right",
  },

  checkoutBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
};
