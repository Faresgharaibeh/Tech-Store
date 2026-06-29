import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { theme } from "../styles/theme";

function Navbar() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const { wishlistItems } = useWishlist();

  const navStyle = ({ isActive }) => ({
    ...styles.link,
    background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
    borderColor: isActive ? "rgba(255,255,255,0.22)" : "transparent",
  });

  return (
    <nav style={styles.nav}>
      <div className="navbar-inner" style={styles.inner}>
        <Link to="/" style={styles.logo} className="interactive">
          <span style={styles.logoIcon}>⚡</span>
          <span>Tech Store</span>
        </Link>

        <div className="navbar-links" style={styles.links}>
          <NavLink to="/" style={navStyle}>
            Home
          </NavLink>

          <NavLink to="/products" style={navStyle}>
            Products
          </NavLink>

          <NavLink to="/wishlist" style={navStyle}>
            Wishlist <span style={styles.badge}>{wishlistItems.length}</span>
          </NavLink>

          <NavLink to="/cart" style={navStyle}>
            Cart <span style={styles.badge}>{totalItems}</span>
          </NavLink>

          {user ? (
            <>
              <NavLink to="/my-orders" style={navStyle}>
                My Orders
              </NavLink>

              <span style={styles.userPill}>{user.email?.split("@")[0]}</span>

              <button onClick={logout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" style={navStyle}>
                Login
              </NavLink>

              <Link
                to="/register"
                style={styles.registerBtn}
                className="interactive"
              >
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
    background: "rgba(11, 16, 32, 0.78)",
    borderBottom: "1px solid rgba(255,255,255,0.10)",
    backdropFilter: "blur(18px)",
  },

  inner: {
    width: "min(1400px, 100%)",
    margin: "0 auto",
    padding: "14px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
    textDecoration: "none",
    fontSize: "24px",
    fontWeight: 900,
    letterSpacing: "-0.4px",
  },

  logoIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "14px",
    display: "grid",
    placeItems: "center",
    background: theme.gradients.primary,
    boxShadow: "0 12px 28px rgba(59,130,246,.34)",
  },

  links: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  link: {
    color: "#F8FAFC",
    textDecoration: "none",
    fontWeight: 750,
    fontSize: "14px",
    padding: "9px 12px",
    borderRadius: "14px",
    border: "1px solid transparent",
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    transition: theme.transition,
  },

  badge: {
    minWidth: "23px",
    height: "23px",
    padding: "0 7px",
    borderRadius: theme.radius.full,
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.gradients.primary,
    color: "#fff",
    fontSize: "12px",
    fontWeight: 900,
  },

  userPill: {
    maxWidth: "160px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    color: "#DBEAFE",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    padding: "9px 12px",
    borderRadius: theme.radius.full,
    fontWeight: 700,
    fontSize: "13px",
  },

  logoutBtn: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "14px",
    background: "rgba(239,68,68,0.16)",
    color: "#FCA5A5",
    cursor: "pointer",
    fontWeight: 800,
  },

  registerBtn: {
    textDecoration: "none",
    padding: "11px 16px",
    borderRadius: "14px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 850,
    boxShadow: "0 12px 26px rgba(59,130,246,.28)",
  },
};

export default Navbar;