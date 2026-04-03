import { useState } from "react";
import { Link } from "react-router-dom";
import { productImages } from "../data/productImages";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useUI } from "../context/UIContext";
import { toast } from "react-toastify";
import { getTheme } from "../styles/theme";

function ProductCard({ product }) {
  const image = productImages[product.name];
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { darkMode } = useUI();
  const theme = getTheme(darkMode);

  const [isHovered, setIsHovered] = useState(false);

  const stockCount = Number(product.stock) || 0;

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleToggleWishlist = () => {
    const alreadyExists = isInWishlist(product.id);
    toggleWishlist(product);

    if (alreadyExists) {
      toast.info("Removed from wishlist 💔");
    } else {
      toast.success("Added to wishlist ❤️");
    }
  };

  return (
    <div
      style={{
        ...styles.card,
        backgroundColor: theme.colors.surface,
        border: `1px solid ${theme.colors.border}`,
        boxShadow: isHovered ? theme.shadow.lg : theme.shadow.sm,
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button style={styles.wishlistBtn} onClick={handleToggleWishlist}>
        {isInWishlist(product.id) ? "❤️" : "🤍"}
      </button>

      <Link to={`/product/${product.id}`} style={{ ...styles.link, color: theme.colors.text }}>
        <div style={{ ...styles.imageWrap, backgroundColor: theme.colors.surfaceSoft }}>
          <img
            src={image}
            alt={product.name}
            style={{
              ...styles.image,
              transform: isHovered ? "scale(1.06)" : "scale(1)",
            }}
          />
        </div>

        <div style={styles.content}>
          <p style={{ ...styles.brand, color: theme.colors.textMuted }}>{product.brand}</p>
          <h3 style={{ ...styles.title, color: theme.colors.text }}>{product.name}</h3>

          <div style={styles.bottomInfo}>
            <p style={{ ...styles.price, color: theme.colors.text }}>${product.price}</p>

            <p
              style={{
                ...styles.stockText,
                color: stockCount > 0 ? theme.colors.success : theme.colors.danger,
              }}
            >
              {stockCount > 0 ? `In Stock (${stockCount})` : "Out of Stock"}
            </p>
          </div>
        </div>
      </Link>

      <button
        style={{
          ...styles.button,
          background:
            stockCount > 0
              ? `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`
              : "#9CA3AF",
          cursor: stockCount > 0 ? "pointer" : "not-allowed",
        }}
        onClick={handleAddToCart}
        disabled={stockCount === 0}
      >
        {stockCount > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    width: "270px",
    borderRadius: "18px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    position: "relative",
    transition: "all 0.25s ease",
  },
  wishlistBtn: {
    position: "absolute",
    top: "14px",
    right: "14px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    fontSize: "18px",
    zIndex: 2,
  },
  link: {
    textDecoration: "none",
    display: "block",
  },
  imageWrap: {
    width: "100%",
    height: "230px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "18px",
    transition: "all 0.25s ease",
  },
  content: {
    paddingTop: "12px",
  },
  brand: {
    margin: "0 0 8px",
    fontSize: "13px",
    fontWeight: "600",
  },
  title: {
    fontSize: "20px",
    fontWeight: "800",
    margin: "0 0 14px",
    lineHeight: "1.4",
    minHeight: "56px",
  },
  bottomInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  price: {
    margin: 0,
    fontSize: "22px",
    fontWeight: "800",
  },
  stockText: {
    margin: 0,
    fontSize: "13px",
    fontWeight: "700",
  },
  button: {
    marginTop: "4px",
    padding: "12px",
    border: "none",
    borderRadius: "14px",
    color: "#fff",
    fontWeight: "700",
    fontSize: "15px",
  },
};

export default ProductCard;