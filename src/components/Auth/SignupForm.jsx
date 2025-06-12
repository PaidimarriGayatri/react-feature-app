const SignupForm = ({ form, onChange, onSubmit, loading }) => {
  const styles = {
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    checkbox: {
      marginRight: "10px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        style={styles.input}
        type="text"
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={onChange}
      />
      <input
        style={styles.input}
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={onChange}
      />
      <input
        style={styles.input}
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={onChange}
      />
      <div>
        <input
          style={styles.checkbox}
          type="checkbox"
          name="agree"
          checked={form.agree}
          onChange={onChange}
        />
        I agree to the terms and conditions
      </div>
      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignupForm;
