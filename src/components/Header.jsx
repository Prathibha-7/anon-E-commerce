import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header({ onOpenAuth }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  return (
    <header className="topbar">
      <Link to="/" className="brand">
        ANON SHOP
      </Link>

      <nav className="topbar-actions">
        <Link to="/">Products</Link>
        <Link to="/checkout">Checkout</Link>
        <span className="cart-pill">Cart: {totalItems}</span>
        {isAuthenticated ? (
          <>
            <span className="user-pill">{user.name}</span>
            <button type="button" className="ghost-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <button type="button" className="ghost-btn" onClick={onOpenAuth}>
            Login / Register
          </button>
        )}
      </nav>
    </header>
  );
}
