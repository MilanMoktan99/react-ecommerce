import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        name: form.name,
        email: res.user.email,
        provider: "email",
        createdAt: new Date(),
      });

      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          provider: "google",
          createdAt: new Date(),
        },
        { merge: true }
      );

      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const signInWithFacebook = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider);
      const user = res.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          provider: "facebook",
          createdAt: new Date(),
        },
        { merge: true }
      );

      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create account</h2>
        <p style={styles.subtitle}>Join us and start shopping</p>

        <input
          type="text"
          placeholder="Full name"
          style={styles.input}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email address"
          style={styles.input}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.primaryBtn} onClick={handleRegister}>
          Create account
        </button>

        <div style={styles.divider}>
          <span>OR</span>
        </div>

        <button style={styles.googleBtn} onClick={signInWithGoogle}>
          <FcGoogle size={18} />
          Continue with Google
        </button>

        <button style={styles.facebookBtn} onClick={signInWithFacebook}>
          <FaFacebookF size={16} />
          Continue with Facebook
        </button>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
  },

  card: {
    width: "380px",
    padding: "28px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
    textAlign: "center",
  },

  title: {
    marginBottom: "4px",
    fontSize: "22px",
    fontWeight: "600",
  },

  subtitle: {
    marginBottom: "20px",
    color: "#64748b",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    height: "42px",
    padding: "0 12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },

  primaryBtn: {
    width: "100%",
    height: "44px",
    marginTop: "6px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "15px",
  },

  divider: {
    margin: "18px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#94a3b8",
    fontSize: "12px",
  },

  googleBtn: {
    width: "100%",
    height: "42px",
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
  },

  facebookBtn: {
    width: "100%",
    height: "42px",
    marginTop: "10px",
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
    marginTop: "16px",
    fontSize: "13px",
    color: "#475569",
  },

  link: {
    color: "#2563eb",
    fontWeight: "500",
    textDecoration: "none",
  },
};
