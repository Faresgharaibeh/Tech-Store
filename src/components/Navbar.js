import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { wishlistItems } = useWishlist();

  return (
    <nav style={styles.nav}>
      <div style={styles.inner}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoDot}></span>
          Tech Store
        </Link>

        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/products" style={styles.link}>Products</Link>

          <Link to="/wishlist" style={styles.link}>
            ❤️ Wishlist ({wishlistItems.length})
          </Link>

          <Link to="/cart" style={styles.link}>
            🛒 Cart ({totalItems})
          </Link>

          {user ? (
            <>
              <Link to="/my-orders" style={styles.link}>
                📦 My Orders
              </Link>

              <span style={styles.userText}>
                {user.email}
              </span>

              <button onClick={logout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    background: "#111827",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  inner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "26px",
    fontWeight: "800",
  },
  logoDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
    boxShadow: "0 0 12px #3B82F6",
  },
  links: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "14px",
    padding: "8px 10px",
    borderRadius: "10px",
  },
  userText: {
    color: "#cbd5e1",
    fontSize: "14px",
    paddingLeft: "14px",
    borderLeft: "1px solid rgba(255,255,255,0.12)",
  },
  logoutBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "12px",
    background: "#EF4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
  },
  registerBtn: {
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #3B82F6, #8B5CF6)",
    color: "#fff",
    fontWeight: "700",
  },
};

export default Navbar;