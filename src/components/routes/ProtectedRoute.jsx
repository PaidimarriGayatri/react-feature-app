import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      navigate("/login", { replace: true });
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <p>Loading...</p>
        <div className="spinner" />
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
