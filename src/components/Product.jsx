import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const styles = {
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },

  image: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    marginBottom: "10px",
  },

  title: {
    fontSize: "16px",
    margin: "10px 0",
  },

  text: {
    color: "#555",
    margin: "5px 0",
  },

  price: {
    fontWeight: "bold",
    fontSize: "18px",
    margin: "10px 0",
  },

  link: {
    display: "inline-block",
    marginTop: "10px",
    textDecoration: "none",
    color: "white",
    backgroundColor: "#007bff",
    padding: "8px 12px",
    borderRadius: "5px",
  },
};

const Product = () => {
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   axios.get("https://fakestoreapi.com/products")
  //     .then((res) => setProducts(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
         const response = await axios.get('https://fakestoreapi.com/products');
         console.log(response);
         console.log(response.data);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProducts();
  }, [products]);

  return (
    <>
      <h1 style={styles.heading}>Product Page</h1>

      <div style={styles.container}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.title} style={styles.image} />
            <h3 style={styles.title}>{product.title}</h3>
            <p style={styles.text}>
              ⭐ {product.rating.rate}
            </p>
            <p style={styles.price}>
              ${product.price}
            </p>

            <Link to={`/product/${product.id}`} style={styles.link} state={{product: product}} >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
