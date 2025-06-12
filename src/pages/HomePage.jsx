import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Welcome to DevHire</h1>
        <p style={styles.subheading}>
          Your personalized job board for developers
        </p>
        <div style={styles.buttons}>
          <Link
            to="/postings"
            style={{ ...styles.button, backgroundColor: "#007bff" }}
          >
            Browse Postings
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    backgroundColor: "rgb(230, 243, 113)",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "100%",
    maxWidth: "500px",
  },
  heading: {
    fontSize: "2.2rem",
    marginBottom: "10px",
    color: "#333",
  },
  subheading: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    color: "#555",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
  },
  button: {
    padding: "12px 24px",
    borderRadius: "6px",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    transition: "0.3s ease",
  },
};

export default HomePage;
