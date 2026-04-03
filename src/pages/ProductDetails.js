import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { productImages } from "../data/productImages";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import ReviewSection from "../components/ReviewSection";
import RelatedProducts from "../components/RelatedProducts";
import { theme } from "../styles/theme";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  if (!product) {
    return <h2 style={{ padding: "30px" }}>Product not found</h2>;
  }

  const image = productImages[product.name];
  const stockCount = Number(product.stock) || 0;

  const handleAddToCart = () => {
    if (stockCount === 0) {
      toast.error("This product is out of stock");
      return;
    }

    addToCart(product, quantity);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.imageCard}>
          <div style={styles.imageWrap}>
            <img src={image} alt={product.name} style={styles.image} />
          </div>
        </div>

        <div style={styles.infoCard}>
          <p style={styles.brand}>{product.brand}</p>
          <h1 style={styles.title}>{product.name}</h1>

          <div style={styles.metaRow}>
            <span style={styles.categoryBadge}>{product.category}</span>
            <span
              style={{
                ...styles.stockBadge,
                color: stockCount > 0 ? theme.colors.success : theme.colors.danger,
                backgroundColor:
                  stockCount > 0 ? "#EAF8EA" : "#FEECEC",
              }}
            >
              {stockCount > 0 ? `${stockCount} in stock` : "Out of stock"}
            </span>
          </div>

          <h2 style={styles.price}>${product.price}</h2>

          <p style={styles.description}>{product.description}</p>

          {stockCount > 0 && (
            <div style={styles.purchaseRow}>
              <div style={styles.quantityBox}>
                <button
                  style={styles.qtyBtn}
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                >
                  −
                </button>

                <span style={styles.qtyValue}>{quantity}</span>

                <button
                  style={styles.qtyBtn}
                  onClick={() =>
                    setQuantity((prev) => Math.min(stockCount, prev + 1))
                  }
                >
                  +
                </button>
              </div>

              <button style={styles.button} onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          )}

          {stockCount === 0 && (
            <button style={styles.disabledButton} disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>

      <div style={styles.sectionSpacing}>
        <ReviewSection productId={product.id} />
      </div>

      <div style={styles.sectionSpacing}>
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: theme.colors.background,
    padding: "28px",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1.1fr 1fr",
    gap: "28px",
    alignItems: "stretch",
  },
  imageCard: {
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadow.md,
    padding: "24px",
  },
  imageWrap: {
    height: "560px",
    borderRadius: "22px",
    backgroundColor: theme.colors.surfaceSoft,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "28px",
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    boxShadow: theme.shadow.md,
    padding: "32px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  brand: {
    margin: "0 0 10px",
    color: theme.colors.accent,
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  title: {
    margin: "0 0 18px",
    color: theme.colors.text,
    fontSize: "42px",
    lineHeight: "1.15",
    fontWeight: "800",
  },
  metaRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },
  categoryBadge: {
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: "#EEF2FF",
    color: theme.colors.accentSoft,
    fontWeight: "700",
    fontSize: "13px",
  },
  stockBadge: {
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px",
  },
  price: {
    margin: "0 0 18px",
    fontSize: "36px",
    fontWeight: "800",
    color: theme.colors.text,
  },
  description: {
    margin: "0 0 26px",
    color: theme.colors.textMuted,
    fontSize: "16px",
    lineHeight: "1.9",
  },
  purchaseRow: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  quantityBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "10px 14px",
    borderRadius: "16px",
    backgroundColor: theme.colors.surfaceSoft,
    border: `1px solid ${theme.colors.border}`,
  },
  qtyBtn: {
    width: "42px",
    height: "42px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: theme.colors.primary,
    color: "#fff",
    cursor: "pointer",
    fontSize: "22px",
    fontWeight: "700",
  },
  qtyValue: {
    minWidth: "28px",
    textAlign: "center",
    fontSize: "18px",
    fontWeight: "800",
    color: theme.colors.text,
  },
  button: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "16px",
    background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
    color: "#fff",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: theme.shadow.sm,
  },
  disabledButton: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "16px",
    backgroundColor: "#9CA3AF",
    color: "#fff",
    fontWeight: "800",
    fontSize: "15px",
    cursor: "not-allowed",
  },
  sectionSpacing: {
    maxWidth: "1400px",
    margin: "28px auto 0",
  },
};

export default ProductDetails;