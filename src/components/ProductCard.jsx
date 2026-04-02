import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-content">
        <p className="product-category">{product.category}</p>
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className="primary-btn" onClick={() => addToCart(product)} type="button">
          Add to Cart
        </button>
      </div>
    </article>
  );
}
