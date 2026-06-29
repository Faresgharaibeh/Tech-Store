import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { theme } from "../styles/theme";

function Wishlist() {
  const { wishlistItems, clearWishlist } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <main className="page-wrap">
        <div className="container-xl">
          <section style={styles.emptyState} className="fade-up">
            <div style={styles.emptyIcon}>♡</div>
            <h1 style={styles.emptyTitle}>Your wishlist is empty</h1>
            <p style={styles.emptyText}>
              Save your favorite products here and come back to them later.
            </p>

            <Link to="/products" style={styles.primaryBtn}>
              Browse Products
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrap">
      <div className="container-xl">
        <section style={styles.header} className="fade-up">
          <div>
            <span style={styles.kicker}>Wishlist</span>
            <h1 style={styles.title}>Your favorite products</h1>
            <p style={styles.subtitle}>
              All the products you liked are saved here for quick access.
            </p>
          </div>

          <button onClick={clearWishlist} style={styles.clearBtn}>
            Clear Wishlist
          </button>
        </section>

        <section style={styles.grid} className="product-grid">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </section>
      </div>
    </main>
  );
}

const styles = {
  header: {
    marginBottom: "24px",
    padding: "34px",
    borderRadius: theme.radius.xl,
    background: "linear-gradient(135deg, #FFFFFF, #EEF2FF)",
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    display: "flex",
    justifyContent: "space-between",
    gap: "18px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  kicker: {
    color: theme.colors.danger,
    fontWeight: 950,
    textTransform: "uppercase",
    fontSize: "13px",
    letterSpacing: ".6px",
  },

  title: {
    margin: "10px 0 10px",
    fontSize: "42px",
    lineHeight: 1.1,
    fontWeight: 950,
    letterSpacing: "-1px",
  },

  subtitle: {
    margin: 0,
    color: theme.colors.textMuted,
    lineHeight: 1.7,
    fontWeight: 600,
  },

  clearBtn: {
    border: "none",
    borderRadius: "16px",
    padding: "13px 18px",
    background: "rgba(239,68,68,.10)",
    color: theme.colors.danger,
    fontWeight: 950,
    cursor: "pointer",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "22px",
  },

  emptyState: {
    minHeight: "560px",
    borderRadius: theme.radius.xl,
    background: "linear-gradient(135deg, #FFFFFF, #EEF2FF)",
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "40px",
  },

  emptyIcon: {
    width: "90px",
    height: "90px",
    borderRadius: "30px",
    display: "grid",
    placeItems: "center",
    fontSize: "54px",
    color: theme.colors.danger,
    background: "#fff",
    boxShadow: theme.shadow.sm,
    margin: "0 auto 18px",
  },

  emptyTitle: {
    margin: 0,
    fontSize: "42px",
    fontWeight: 950,
  },

  emptyText: {
    margin: "14px auto 24px",
    color: theme.colors.textMuted,
    maxWidth: "520px",
    lineHeight: 1.7,
    fontWeight: 600,
  },

  primaryBtn: {
    display: "inline-flex",
    textDecoration: "none",
    borderRadius: "18px",
    padding: "15px 24px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 950,
  },
};

export default Wishlist;