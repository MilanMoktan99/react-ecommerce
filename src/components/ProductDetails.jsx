import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const styles = {
  container: {
    display: "flex",
    gap: "40px",
    padding: "30px",
    flexWrap: "wrap",
  },
  image: {
    width: "300px",
    height: "300px",
    objectFit: "contain",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
  },
  details: {
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
  },
  description: {
    fontSize: "14px",
    color: "#555",
  },
  price: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: "10px 0",
  },
  inputQty: {
    width: "60px",
    padding: "6px",
    marginRight: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    outline: "none",
  },
  addBtn: {
    padding: "10px 20px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    marginTop: "10px",
  },
  backLink: {
    textDecoration: "none",
    color: "#2563eb",
    marginBottom: "20px",
    display: "inline-block",
  },
  cartInfo: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#444",
  },
};

const ProductDetails = () => {
  const location = useLocation();
  const [product] = useState(location.state?.product || null);
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  if (!product) return <h1>Loading....</h1>;

  const handleAddToCart = () => {
    const alreadyInCart = cart.find((item) => item.id === product.id);

    if (alreadyInCart) {
      alert(
        "Product already added in the cart! Go to the cart to change quantity."
      );
      return;
    }

    const productToAdd = {
      ...product,
      quantity: quantity,
    };

    setCart([...cart, productToAdd]);
    alert(`Added ${quantity} item(s) to cart!`);
  };

  const productInCart = cart.find((item) => item.id === product.id);

  return (
    <>
      <Link to="/product" style={styles.backLink}>
        ← Go back to Product page
      </Link>
      <div style={styles.container}>
        <img src={product.image} alt={product.title} style={styles.image} />

        <div style={styles.details}>
          <h2 style={styles.title}>{product.title}</h2>
          <p style={styles.description}>{product.description}</p>
          <p>
            <strong>Category: </strong>
            {product.category}
          </p>
          <p>Rating: ⭐{product.rating.rate}</p>
          <h3 style={styles.price}>${product.price}</h3>

          {/* Quantity selector */}
          <div>
            <label>
              Quantity:{" "}
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={styles.inputQty}
              />
            </label>
          </div>

          <button style={styles.addBtn} onClick={handleAddToCart}>
            Add to Cart
          </button>

          {productInCart && (
            <p style={styles.cartInfo}>
              You already have {productInCart.quantity} of this item in your
              cart.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
