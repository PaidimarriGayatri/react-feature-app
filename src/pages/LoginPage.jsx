import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthContext,
  LOCAL_STORAGE_AUTHENTICATE_KEY,
} from "../context/AuthContext";

const api = "https://67aca84f3f5a4e1477db6274.mockapi.io";

const LoginPage = () => {
  const { currentUser, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [stage, setStage] = useState("email");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_AUTHENTICATE_KEY);
    if (saved && !currentUser) {
      const user = JSON.parse(saved);
      login(user);
      navigate("/home");
    }
  }, [currentUser, login, navigate]);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${api}/Users?email=${email}`);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setStage("password");
      } else {
        alert("No account found with that email.");
        setStage("email");
      }
    } catch (error) {
      console.error("Error checking email:", error);
      alert("Something went wrong while checking the email.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${api}/Users?email=${email}`);
      const data = await res.json();

      if (data.length === 0) {
        alert("No account with this email");
        return;
      }

      const user = data[0];
      if (user.password === password) {
        login(user);
        localStorage.setItem(
          LOCAL_STORAGE_AUTHENTICATE_KEY,
          JSON.stringify(user)
        );
        navigate("/home");
      } else {
        alert("Incorrect password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const res = await fetch(`${api}/Users?email=${email}`);
    const data = await res.json();
    if (!data.length) return alert("No user found");

    const user = data[0];
    const updatedUser = { ...user, password: newPassword };

    await fetch(`${api}/Users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    });

    localStorage.setItem(
      LOCAL_STORAGE_AUTHENTICATE_KEY,
      JSON.stringify(updatedUser)
    );
    setStage("reset-success");
  };

  const styles = {
    page: {
      display: "flex",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    left: {
      flex: 1,
      backgroundImage:
        "url('https://media.istockphoto.com/id/1574805478/vector/online-registration-and-sign-up-concept-smartphone-with-login-and-password-form-page-on.jpg?s=612x612&w=0&k=20&c=lpLOjPXDDE_ZUQ8UFLT378kW-qK50egLp8MeNGTTTFc=')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    right: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // backgroundColor: "#f5f5f5",
    },
    card: {
      width: "100%",
      maxWidth: "400px",
      padding: "40px",
      backgroundColor: "#fff",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "12px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    linkButton: {
      background: "none",
      border: "none",
      color: "#007bff",
      cursor: "pointer",
      fontSize: "14px",
      textAlign: "right",
      display: "block",
      width: "100%",
    },
    centerText: {
      textAlign: "center",
      marginTop: "20px",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}></div>
      <div style={styles.right}>
        <div style={styles.card}>
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

          {stage === "email" && (
            <form onSubmit={handleEmailSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email"
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Next
              </button>
            </form>
          )}

          {stage === "password" && (
            <>
              <form onSubmit={handlePasswordSubmit}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  style={styles.input}
                />
                <button type="submit" style={styles.button}>
                  Login
                </button>
              </form>
              <button
                style={styles.linkButton}
                onClick={() => setStage("forgot")}
              >
                Forgot password?
              </button>
            </>
          )}

          {stage === "forgot" && (
            <form onSubmit={handleResetPassword}>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Reset Password
              </button>
            </form>
          )}

          {stage === "reset-success" && (
            <>
              <p style={{ color: "green", marginBottom: 10 }}>
                Password reset successfully!
              </p>
              <button
                onClick={() => setStage("password")}
                style={styles.button}
              >
                Login with new password
              </button>
            </>
          )}

          <div style={styles.centerText}>
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
