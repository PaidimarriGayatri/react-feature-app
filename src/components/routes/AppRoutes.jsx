import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import JobFormPage from "../../pages/JobFormPage";
import LoginPage from "../../pages/LoginPage";
import PostingsPage from "../../pages/PostingsPage";
import SignupPage from "../../pages/SignupPage";
import Layout from "./Layout";

import { AuthProvider, useAuth } from "../../context/AuthContext";

import NotFound from "../../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

const AuthRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? <Navigate to="/home" replace /> : children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />

          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthRoute>
                <LoginPage />
              </AuthRoute>
            }
          />
          {/* <Route path="/logout" element={<LogoutPage />} /> */}

          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<HomePage />} />
            <Route path="/form" element={<JobFormPage />} />
            <Route path="/postings" element={<PostingsPage />} />
          </Route>
          {/* 404 catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;
