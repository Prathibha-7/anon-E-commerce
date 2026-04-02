import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function CheckoutPage({ onRequireAuth }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cartItems, totalItems, totalPrice, clearCart, removeFromCart } = useCart();
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }

    if (!cartItems.length) return;

    const formData = new FormData(event.currentTarget);
    const order = {
      customerName: formData.get("name"),
      address: formData.get("address"),
      cardNumber: String(formData.get("cardNumber")).slice(-4),
      totalItems,
      totalPrice,
    };
    setConfirmedOrder(order);
    clearCart();
    event.currentTarget.reset();
  };

  return (
    <section>
      <h1 className="page-title">Checkout</h1>

      {confirmedOrder ? (
        <div className="confirmation-card">
          <h2>Order Confirmed</h2>
          <p>Thank you, {confirmedOrder.customerName}.</p>
          <p>
            Items: {confirmedOrder.totalItems} | Total: ${confirmedOrder.totalPrice.toFixed(2)}
          </p>
          <p>Shipping to: {confirmedOrder.address}</p>
          <p>Payment: **** **** **** {confirmedOrder.cardNumber}</p>
          <button type="button" className="primary-btn" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>
      ) : null}

      <div className="checkout-layout">
        <aside className="card">
          <h2>Cart Summary</h2>
          {!cartItems.length ? (
            <p className="state-text">Your cart is empty.</p>
          ) : (
            <>
              <ul className="cart-list">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <div>
                      <p>{item.title}</p>
                      <small>
                        {item.quantity} x ${item.price.toFixed(2)}
                      </small>
                    </div>
                    <button
                      type="button"
                      className="link-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <p className="totals">
                Items: {totalItems} | Total: ${totalPrice.toFixed(2)}
              </p>
            </>
          )}
        </aside>

        <form className="card form-grid" onSubmit={onSubmit}>
          <h2>Shipping & Payment</h2>
          {!isAuthenticated ? (
            <p className="error-text">Please login/register to place your order.</p>
          ) : null}

          <label>
            Full Name
            <input name="name" type="text" required />
          </label>

          <label>
            Address
            <textarea name="address" rows="3" required />
          </label>

          <label>
            Card Number
            <input
              name="cardNumber"
              type="text"
              inputMode="numeric"
              minLength={12}
              maxLength={19}
              required
            />
          </label>

          <button className="primary-btn" type="submit" disabled={!cartItems.length}>
            Place Mock Order
          </button>
        </form>
      </div>
    </section>
  );
}
