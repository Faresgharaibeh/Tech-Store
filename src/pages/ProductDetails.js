import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { productImages } from "../data/productImages";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import RelatedProducts from "../components/RelatedProducts";
import ReviewSection from "../components/ReviewSection";
import { toast } from "react-toastify";
import { theme } from "../styles/theme";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const image = useMemo(() => {
    if (!product) return null;
    return productImages[product.name];
  }, [product]);

  const stockCount = Number(product?.stock || 0);
  const isFavorite = product ? isInWishlist(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;

    for (let index = 0; index < quantity; index += 1) {
      addToCart(product);
    }
  };

  const handleWishlist = () => {
    if (!product) return;

    toggleWishlist(product);
    toast[isFavorite ? "info" : "success"](
      isFavorite ? "Removed from wishlist" : "Added to wishlist ❤️"
    );
  };

  if (loading) {
    return (
      <main className="page-wrap">
        <div className="container-xl">
          <div style={styles.loadingCard} className="shimmer">
            Loading product...
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="page-wrap">
        <div className="container-xl">
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>😕</div>
            <h1>Product not found</h1>
            <p>The product you are looking for may no longer be available.</p>
            <Link to="/products" style={styles.backBtn}>
              Back to Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrap">
      <div className="container-xl">
        <Link to="/products" style={styles.backLink}>
          ← Back to Products
        </Link>

        <section
          className="responsive-grid-2 fade-up"
          style={styles.productShell}
        >
          <div style={styles.gallery}>
            <div style={styles.mainImageWrap}>
              <span style={styles.badge}>Premium Pick</span>
              <button onClick={handleWishlist} style={styles.wishlistBtn}>
                {isFavorite ? "♥" : "♡"}
              </button>

              <img src={image} alt={product.name} style={styles.image} />
            </div>

            <div style={styles.thumbRow}>
              {[1, 2, 3].map((item) => (
                <div key={item} style={styles.thumb}>
                  <img src={image} alt={product.name} style={styles.thumbImg} />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.info}>
            <p style={styles.brand}>{product.brand || "Tech Store"}</p>

            <h1 style={styles.title}>{product.name}</h1>

            <div style={styles.metaRow}>
              <span style={styles.rating}>★ 4.8 Rating</span>
              <span style={styles.dot}></span>
              <span style={styles.stock}>
                {stockCount > 0 ? `${stockCount} in stock` : "Sold out"}
              </span>
            </div>

            <p style={styles.category}>{product.category}</p>

            <div style={styles.priceRow}>
              <strong style={styles.price}>
                ${Number(product.price || 0).toFixed(2)}
              </strong>

              <span style={styles.oldPrice}>
                ${(Number(product.price || 0) * 1.18).toFixed(2)}
              </span>
            </div>

            <p style={styles.description}>
              {product.description ||
                "A premium tech accessory designed to improve your everyday setup with modern performance, clean design and reliable quality."}
            </p>

            <div style={styles.benefits}>
              <div style={styles.benefit}>🚚 Fast Delivery</div>
              <div style={styles.benefit}>🛡️ Secure Checkout</div>
              <div style={styles.benefit}>↩️ Easy Returns</div>
            </div>

            <div style={styles.purchaseBox}>
              <div style={styles.quantityBox}>
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  style={styles.quantityBtn}
                >
                  -
                </button>

                <span style={styles.quantity}>{quantity}</span>

                <button
                  onClick={() =>
                    setQuantity((prev) => Math.min(stockCount || 1, prev + 1))
                  }
                  style={styles.quantityBtn}
                  disabled={quantity >= stockCount}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={stockCount === 0}
                style={{
                  ...styles.addBtn,
                  background:
                    stockCount > 0 ? theme.gradients.primary : "#94A3B8",
                }}
              >
                {stockCount > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </section>

        <section style={styles.tabsShell} className="fade-up">
          <div style={styles.tabs}>
            <button
              onClick={() => setActiveTab("description")}
              style={{
                ...styles.tabBtn,
                ...(activeTab === "description" ? styles.activeTab : {}),
              }}
            >
              Description
            </button>

            <button
              onClick={() => setActiveTab("reviews")}
              style={{
                ...styles.tabBtn,
                ...(activeTab === "reviews" ? styles.activeTab : {}),
              }}
            >
              Reviews
            </button>

            <button
              onClick={() => setActiveTab("shipping")}
              style={{
                ...styles.tabBtn,
                ...(activeTab === "shipping" ? styles.activeTab : {}),
              }}
            >
              Shipping
            </button>
          </div>

          <div style={styles.tabContent}>
            {activeTab === "description" && (
              <>
                <h2>Product Overview</h2>
                <p>
                  {product.description ||
                    "This product is built for users who want clean design, reliable quality and a modern shopping experience. It fits gaming setups, office spaces and everyday tech users."}
                </p>
              </>
            )}

            {activeTab === "reviews" && <ReviewSection productId={product.id} />}

            {activeTab === "shipping" && (
              <>
                <h2>Shipping & Returns</h2>
                <p>
                  Orders are processed quickly. Delivery time may vary depending
                  on your city and product availability. You can review your
                  order status from the My Orders page after checkout.
                </p>
              </>
            )}
          </div>
        </section>

        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      </div>
    </main>
  );
}

const styles = {
  backLink: {
    display: "inline-flex",
    marginBottom: "18px",
    textDecoration: "none",
    color: theme.colors.accent,
    fontWeight: 900,
  },

  productShell: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "26px",
    alignItems: "start",
  },

  gallery: {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.xl,
    padding: "18px",
    boxShadow: theme.shadow.sm,
  },

  mainImageWrap: {
    position: "relative",
    minHeight: "520px",
    borderRadius: "30px",
    background: "linear-gradient(145deg, #EEF2FF, #FFFFFF)",
    display: "grid",
    placeItems: "center",
    overflow: "hidden",
  },

  badge: {
    position: "absolute",
    top: "18px",
    left: "18px",
    padding: "9px 13px",
    borderRadius: theme.radius.full,
    background: "rgba(255,255,255,.84)",
    color: theme.colors.accent,
    fontWeight: 950,
    fontSize: "13px",
    border: `1px solid ${theme.colors.border}`,
  },

  wishlistBtn: {
    position: "absolute",
    top: "18px",
    right: "18px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,.8)",
    background: "rgba(255,255,255,.9)",
    color: theme.colors.danger,
    fontSize: "24px",
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: theme.shadow.sm,
  },

  image: {
    width: "100%",
    height: "100%",
    maxHeight: "470px",
    objectFit: "contain",
    padding: "36px",
  },

  thumbRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginTop: "14px",
  },

  thumb: {
    height: "110px",
    borderRadius: "20px",
    background: "#F8FAFC",
    border: `1px solid ${theme.colors.border}`,
    display: "grid",
    placeItems: "center",
  },

  thumbImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "14px",
  },

  info: {
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.xl,
    padding: "34px",
    boxShadow: theme.shadow.sm,
  },

  brand: {
    margin: "0 0 12px",
    color: theme.colors.accent,
    textTransform: "uppercase",
    fontSize: "13px",
    fontWeight: 950,
    letterSpacing: ".6px",
  },

  title: {
    margin: 0,
    fontSize: "46px",
    lineHeight: 1.08,
    letterSpacing: "-1.4px",
    fontWeight: 950,
  },

  metaRow: {
    marginTop: "18px",
    display: "flex",
    alignItems: "center",
    gap: "11px",
    flexWrap: "wrap",
  },

  rating: {
    color: theme.colors.warning,
    fontWeight: 950,
  },

  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: theme.colors.border,
  },

  stock: {
    color: theme.colors.success,
    fontWeight: 900,
  },

  category: {
    margin: "18px 0 0",
    display: "inline-flex",
    padding: "9px 13px",
    borderRadius: theme.radius.full,
    background: "rgba(59,130,246,.09)",
    color: theme.colors.accent,
    fontWeight: 900,
  },

  priceRow: {
    display: "flex",
    alignItems: "end",
    gap: "14px",
    marginTop: "22px",
  },

  price: {
    fontSize: "42px",
    fontWeight: 950,
    color: theme.colors.text,
  },

  oldPrice: {
    marginBottom: "7px",
    color: theme.colors.textMuted,
    textDecoration: "line-through",
    fontWeight: 800,
  },

  description: {
    marginTop: "22px",
    color: theme.colors.textMuted,
    lineHeight: 1.8,
    fontWeight: 600,
    fontSize: "16px",
  },

  benefits: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "24px",
  },

  benefit: {
    padding: "13px",
    borderRadius: "16px",
    background: theme.colors.surfaceSoft,
    fontSize: "13px",
    fontWeight: 850,
    textAlign: "center",
  },

  purchaseBox: {
    display: "grid",
    gridTemplateColumns: "150px 1fr",
    gap: "14px",
    marginTop: "28px",
  },

  quantityBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "18px",
    background: theme.colors.surfaceSoft,
    padding: "7px",
  },

  quantityBtn: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    border: "none",
    background: "#fff",
    fontWeight: 950,
    cursor: "pointer",
  },

  quantity: {
    fontWeight: 950,
    fontSize: "18px",
  },

  addBtn: {
    border: "none",
    borderRadius: "18px",
    color: "#fff",
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: "0 18px 38px rgba(59,130,246,.25)",
  },

  tabsShell: {
    marginTop: "26px",
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.xl,
    boxShadow: theme.shadow.sm,
    overflow: "hidden",
  },

  tabs: {
    display: "flex",
    gap: "8px",
    padding: "14px",
    borderBottom: `1px solid ${theme.colors.border}`,
    flexWrap: "wrap",
  },

  tabBtn: {
    border: "none",
    borderRadius: "15px",
    padding: "12px 16px",
    background: "transparent",
    color: theme.colors.textMuted,
    fontWeight: 900,
    cursor: "pointer",
  },

  activeTab: {
    background: theme.gradients.primary,
    color: "#fff",
  },

  tabContent: {
    padding: "26px",
    lineHeight: 1.75,
    color: theme.colors.textMuted,
    fontWeight: 600,
  },

  loadingCard: {
    padding: "80px",
    borderRadius: theme.radius.xl,
    background: theme.colors.surface,
    boxShadow: theme.shadow.sm,
    textAlign: "center",
    fontWeight: 900,
  },

  emptyState: {
    padding: "80px 24px",
    borderRadius: theme.radius.xl,
    background: theme.colors.surface,
    textAlign: "center",
    boxShadow: theme.shadow.sm,
  },

  emptyIcon: {
    fontSize: "50px",
    marginBottom: "16px",
  },

  backBtn: {
    display: "inline-flex",
    marginTop: "16px",
    textDecoration: "none",
    padding: "13px 18px",
    borderRadius: "16px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 900,
  },
};

export default ProductDetails;