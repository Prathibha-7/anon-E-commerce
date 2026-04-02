import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";

const API_URL = "https://fakestoreapi.com/products";
const PAGE_SIZE = 8;

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const cached = sessionStorage.getItem("anon_products_cache");
    if (cached) {
      setProducts(JSON.parse(cached));
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch products.");
        const data = await response.json();
        if (!cancelled) {
          setProducts(data);
          sessionStorage.setItem("anon_products_cache", JSON.stringify(data));
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleProducts = useMemo(
    () => products.slice(0, visibleCount),
    [products, visibleCount]
  );

  if (loading) return <p className="state-text">Loading products...</p>;
  if (error) return <p className="state-text error-text">{error}</p>;
  if (!products.length) return <p className="state-text">No products found.</p>;

  return (
    <section>
      <h1 className="page-title">Products</h1>
      <div className="grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < products.length ? (
        <div className="centered">
          <button
            className="primary-btn"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            type="button"
          >
            Load More
          </button>
        </div>
      ) : null}
    </section>
  );
}
