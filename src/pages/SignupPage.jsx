import React, { useState } from "react";
import SignupForm from "../components/Auth/SignupForm";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://67aca84f3f5a4e1477db6274.mockapi.io";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      return alert("All fields are required.");
    }
    if (!form.agree) {
      return alert("You must agree to the terms.");
    }
    setLoading(true);
    try {
      const checkRes = await fetch(`${API_URL}/Users`);
      if (!checkRes.ok) throw new Error("Failed to check users");
      const allUsers = await checkRes.json();
      const existingUsers = allUsers.filter(
        (user) => user.email === form.email
      );
      if (existingUsers.length > 0) {
        setLoading(false);
        return alert("Email already registered. Please log in.");
      }
      const res = await fetch(`${API_URL}/Users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Inline Styles
  const styles = {
    page: {
      display: "flex",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    left: {
      flex: 1,
      backgroundImage:
        "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1350&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    right: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "#f9f9f9",
    },
    formCard: {
      width: "100%",
      maxWidth: "400px",
      padding: "40px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
      marginBottom: "20px",
      textAlign: "center",
    },
    switchText: {
      textAlign: "center",
      marginTop: "15px",
    },
    link: {
      color: "#007bff",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}></div>
      <div style={styles.right}>
        <div style={styles.formCard}>
          <h2 style={styles.title}>Signup</h2>
          <SignupForm
            form={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
          />
          <p style={styles.switchText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
