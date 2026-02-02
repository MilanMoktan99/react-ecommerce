import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../config/firebase"; // make sure path is correct

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Email + Password login
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  // Facebook login
  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back</h2>
        <p style={styles.subtitle}>Login to your account</p>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.primaryBtn} onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <div style={styles.divider}>
          <span>OR</span>
        </div>

        <button style={styles.googleBtn} onClick={handleGoogleLogin}>
          <FcGoogle size={20} /> Continue with Google
        </button>

        <button style={styles.facebookBtn} onClick={handleFacebookLogin}>
          <FaFacebook size={18} /> Continue with Facebook
        </button>

        <p style={styles.footerText}>
          Don’t have an account?{" "}
          <Link to="/register">
            <span style={styles.link}>Register</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

// Styles
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f8fafc",
  },

  card: {
    width: "380px",
    padding: "32px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  title: {
    marginBottom: "6px",
    fontSize: "22px",
    fontWeight: "600",
  },

  subtitle: {
    marginBottom: "22px",
    color: "#64748b",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
  },

  divider: {
    margin: "20px auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "#94a3b8",
    fontSize: "12px",
  },

  googleBtn: {
    width: "100%",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
    marginBottom: "10px",
  },

  facebookBtn: {
    width: "100%",
    padding: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#1877F2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "14px",
  },

  footerText: {
    marginTop: "18px",
    fontSize: "13px",
    color: "#475569",
  },

  link: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "500",
  },

  error: {
    color: "#dc2626",
    fontSize: "13px",
    marginBottom: "10px",
  },
};
