// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const styles = {
  container: {
    display: "flex",
    gap: "30px",
    padding: "30px",
  },
  image: {
    width: "300px",
    height: "300px",
    objectFit: "contain",
  },
  details: {
    maxWidth: "600px",
  },
};

const ProductDetails = () => {
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const { id } = useParams();

  const { addToCart, cart } = useContext(CartContext);

  // useEffect(() => {
  //   if(!product) {
  //     axios.get(`https://fakestoreapi.com/products/${id}`)
  //       .then(res => setProduct(res.data))
  //       .catch(err => console.log(err));
  //   }
  // }, [id, product])

  // useEffect(() => {
  //   axios.get(`https://fakestoreapi.com/products/${id}`)
  //     .then((res) => setProduct(res.data))
  //     .catch((err) => console.log(err));
  // }, [])

  if (!product) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      <Link to='/product'>Go back to Product page</Link>                                      
      <div style={styles.container}>
        <img src={product.image} alt="" style={styles.image} />
        <div style={styles.details}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <strong>Category: </strong>
            {product.category}
          </p>
          <p>Rating: ⭐{product.rating.rate}</p>
          <h3>{product.price}</h3>
            <button onClick={() => addToCart(product)}>
              Add to cart
            </button>
          <br />
          <span>Item in cart: {cart.length}</span>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
