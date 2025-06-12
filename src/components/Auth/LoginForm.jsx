import React from "react";
import "./Auth.css";

const LoginForm = ({
  stage,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPassword,
  showForgot,
}) => {
  return (
    <form onSubmit={onSubmit} className="auth-form">
      {stage === "email" ? (
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={onEmailChange}
          required
        />
      ) : (
        <>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={onPasswordChange}
            required
          />
          {showForgot && (
            <button
              type="button"
              className="auth-link-button"
              onClick={onForgotPassword}
            >
              Forgot Password?
            </button>
          )}
        </>
      )}

      <button type="submit" className="auth-button">
        {stage === "email" ? "Next" : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
