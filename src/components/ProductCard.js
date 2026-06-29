import { useState } from "react";
import { Link } from "react-router-dom";
import { productImages } from "../data/productImages";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { toast } from "react-toastify";
import { theme } from "../styles/theme";

function ProductCard({ product }) {
  const image = productImages[product.name];
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [hovered, setHovered] = useState(false);

  const stockCount = Number(product.stock) || 0;
  const isFavorite = isInWishlist(product.id);
  const price = Number(product.price || 0);
  const fakeOldPrice = Math.round(price * 1.18);

  const handleToggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    toggleWishlist(product);

    toast[isFavorite ? "info" : "success"](
      isFavorite ? "Removed from wishlist" : "Added to wishlist ❤️"
    );
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();

    addToCart(product);
  };

  return (
    <article
      className="product-card fade-up"
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-9px)" : "translateY(0)",
        boxShadow: hovered ? theme.shadow.lg : theme.shadow.sm,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`} style={styles.link}>
        <div style={styles.imageWrap}>
          <span style={styles.saleBadge}>Hot Pick</span>

          <button style={styles.wishlistBtn} onClick={handleToggleWishlist}>
            {isFavorite ? "♥" : "♡"}
          </button>

          <img
            src={image}
            alt={product.name}
            style={{
              ...styles.image,
              transform: hovered ? "scale(1.08) rotate(-1deg)" : "scale(1)",
            }}
          />

          <button
            style={{
              ...styles.quickBtn,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(12px)",
            }}
            onClick={handleAddToCart}
            disabled={stockCount === 0}
          >
            {stockCount > 0 ? "Quick Add" : "Out of Stock"}
          </button>
        </div>

        <div style={styles.content}>
          <div style={styles.topLine}>
            <p style={styles.brand}>{product.brand || "Tech"}</p>
            <span style={styles.rating}>★ 4.8</span>
          </div>

          <h3 style={styles.title}>{product.name}</h3>
          <p style={styles.category}>{product.category}</p>

          <div style={styles.footer}>
            <div>
              <p style={styles.price}>${price.toFixed(2)}</p>
              <p style={styles.oldPrice}>${fakeOldPrice.toFixed(2)}</p>
            </div>

            <span
              style={{
                ...styles.stock,
                color:
                  stockCount > 0 ? theme.colors.success : theme.colors.danger,
                background:
                  stockCount > 0
                    ? "rgba(16,185,129,.10)"
                    : "rgba(239,68,68,.10)",
              }}
            >
              {stockCount > 0 ? "In Stock" : "Sold Out"}
            </span>
          </div>
        </div>
      </Link>

      <button
        style={{
          ...styles.addBtn,
          background: stockCount > 0 ? theme.gradients.primary : "#94A3B8",
        }}
        onClick={handleAddToCart}
        disabled={stockCount === 0}
      >
        {stockCount > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </article>
  );
}

const styles = {
  card: {
    width: "276px",
    borderRadius: theme.radius.lg,
    padding: "14px",
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    transition: theme.transition,
    position: "relative",
  },

  link: {
    textDecoration: "none",
    color: theme.colors.text,
    display: "block",
  },

  imageWrap: {
    position: "relative",
    height: "230px",
    borderRadius: "22px",
    background: "linear-gradient(145deg, #F8FAFC, #EEF2FF)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  saleBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    zIndex: 2,
    padding: "7px 10px",
    borderRadius: theme.radius.full,
    background: "rgba(255,255,255,.85)",
    color: theme.colors.accentSoft,
    border: `1px solid ${theme.colors.border}`,
    fontSize: "12px",
    fontWeight: 900,
  },

  wishlistBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    zIndex: 3,
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,.75)",
    background: "rgba(255,255,255,.88)",
    color: theme.colors.danger,
    cursor: "pointer",
    fontSize: "22px",
    fontWeight: 900,
    boxShadow: theme.shadow.sm,
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "26px",
    transition: theme.transition,
  },

  quickBtn: {
    position: "absolute",
    left: "16px",
    right: "16px",
    bottom: "16px",
    border: "none",
    borderRadius: "16px",
    padding: "12px",
    background: "rgba(11,16,32,.88)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 850,
    transition: theme.transition,
  },

  content: {
    padding: "16px 4px 10px",
  },

  topLine: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },

  brand: {
    margin: 0,
    color: theme.colors.textMuted,
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: ".5px",
  },

  rating: {
    color: theme.colors.warning,
    fontSize: "13px",
    fontWeight: 900,
  },

  title: {
    minHeight: "52px",
    margin: "9px 0 6px",
    fontSize: "19px",
    lineHeight: 1.35,
    fontWeight: 900,
    letterSpacing: "-.2px",
  },

  category: {
    margin: "0 0 14px",
    color: theme.colors.textMuted,
    fontSize: "13px",
    fontWeight: 700,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: "10px",
  },

  price: {
    margin: 0,
    color: theme.colors.text,
    fontSize: "22px",
    fontWeight: 950,
  },

  oldPrice: {
    margin: "2px 0 0",
    color: theme.colors.textMuted,
    textDecoration: "line-through",
    fontSize: "13px",
    fontWeight: 700,
  },

  stock: {
    padding: "7px 10px",
    borderRadius: theme.radius.full,
    fontSize: "12px",
    fontWeight: 900,
    whiteSpace: "nowrap",
  },

  addBtn: {
    width: "100%",
    marginTop: "12px",
    border: "none",
    borderRadius: "18px",
    padding: "13px",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    boxShadow: "0 14px 26px rgba(59,130,246,.23)",
  },
};

export default ProductCard;