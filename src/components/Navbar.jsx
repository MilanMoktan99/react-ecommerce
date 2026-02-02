import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { auth } from "../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <nav style={styles.navbar}>
      {/* LEFT SIDE */}
      <div style={styles.left}>
        <h2 style={styles.logo}>MyStore</h2>

        <ul style={styles.navLinks}>
          <li>
            <Link to="/" style={styles.link}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" style={styles.link}>
              About
            </Link>
          </li>
          <li>
            <Link to="/product" style={styles.link}>
              Product
            </Link>
          </li>
        </ul>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <span style={styles.icon}>❤️</span>

        {/* CART ICON */}
        <div style={styles.cartWrapper}>
          <Link to="/cart" style={styles.icon}>
            🛒
          </Link>
          {cart.length > 0 && <span style={styles.cartBadge}>{cart.length}</span>}
        </div>

        {/* LOGIN OR PROFILE */}
        {user ? (
          <div style={styles.profileWrapper}>
            <div onClick={toggleDropdown} style={{ cursor: "pointer" }}>
              {user.photoURL ? (
                <img src={user.photoURL} alt="profile" style={styles.profilePic} />
              ) : (
                <FaUserCircle size={36} color="#333" />
              )}
            </div>

            {showDropdown && (
              <div style={styles.dropdown}>
                <p style={styles.dropdownItem}>
                  Hey, {user.displayName || "User"}
                </p>
                <button style={styles.logoutBtn} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button style={styles.loginBtn}>Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 30px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#fff",
  },

  left: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
  },

  logo: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "bold",
  },

  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "20px",
    margin: 0,
    padding: 0,
  },

  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "500",
  },

  right: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  icon: {
    fontSize: "22px",
    cursor: "pointer",
    textDecoration: "none",
    color: "#333",
  },

  cartWrapper: {
    position: "relative",
  },

  cartBadge: {
    position: "absolute",
    top: "-6px",
    right: "-10px",
    backgroundColor: "red",
    color: "#fff",
    fontSize: "12px",
    padding: "2px 6px",
    borderRadius: "50%",
    fontWeight: "bold",
  },

  loginBtn: {
    padding: "6px 14px",
    border: "1px solid #007bff",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
  },

  profileWrapper: {
    position: "relative",
  },

  profilePic: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    objectFit: "cover",
  },

  dropdown: {
    position: "absolute",
    top: "45px",
    right: 0,
    background: "#fff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    borderRadius: "8px",
    overflow: "hidden",
    minWidth: "150px",
    textAlign: "center",
    zIndex: 100,
  },

  dropdownItem: {
    padding: "10px",
    borderBottom: "1px solid #eee",
  },

  logoutBtn: {
    width: "100%",
    padding: "10px",
    border: "none",
    backgroundColor: "#f87171",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
    borderRadius: "0 0 8px 8px",
  },
};
