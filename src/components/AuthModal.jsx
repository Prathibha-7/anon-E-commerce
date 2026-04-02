import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");

  if (!open) return null;

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      if (mode === "login") login(payload);
      else register(payload);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal-backdrop" role="presentation">
      <div className="modal-card">
        <div className="modal-head">
          <h3>{mode === "login" ? "Login" : "Create account"}</h3>
          <button onClick={onClose} className="ghost-btn" type="button">
            Close
          </button>
        </div>

        <form onSubmit={onSubmit} className="form-grid">
          {mode === "register" && (
            <label>
              Name
              <input type="text" name="name" placeholder="John Doe" />
            </label>
          )}

          <label>
            Email
            <input type="email" name="email" placeholder="you@email.com" />
          </label>

          <label>
            Password
            <input type="password" name="password" placeholder="******" />
          </label>

          {error ? <p className="error-text">{error}</p> : null}

          <button className="primary-btn" type="submit">
            {mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <button
          type="button"
          className="link-btn"
          onClick={() => setMode((prev) => (prev === "login" ? "register" : "login"))}
        >
          {mode === "login"
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}
