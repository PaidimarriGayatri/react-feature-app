import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 not found</h1>
      <p style={styles.message}>The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate(-1)} style={styles.button}>
        Go Back
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "100px 20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    // fontSize: "72px",
    margin: "0 0 20px",
    color: "#333",
  },
  message: {
    // fontSize: "20px",
    marginBottom: "40px",
    color: "#666",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default NotFound;
