import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { productImages } from "../data/productImages";
import { theme } from "../styles/theme";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={styles.page}>
        <div style={styles.emptyContainer}>
          <div style={styles.emptyIcon}>🛒</div>
          <h1 style={styles.emptyTitle}>Your Cart is Empty</h1>
          <p style={styles.emptyText}>
            Looks like you haven’t added anything yet.
          </p>
          <Link to="/" style={styles.shopBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <div>
            <p style={styles.label}>Shopping</p>
            <h1 style={styles.heading}>Your Cart</h1>
          </div>

          <button style={styles.clearBtnTop} onClick={clearCart}>
            Clear Cart
          </button>
        </div>

        <div style={styles.wrapper}>
          <div style={styles.itemsSection}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.card}>
                <div style={styles.imageWrap}>
                  <img
                    src={productImages[item.name]}
                    alt={item.name}
                    style={styles.image}
                  />
                </div>

                <div style={styles.info}>
                  <p style={styles.brand}>{item.brand}</p>
                  <h3 style={styles.name}>{item.name}</h3>
                  <p style={styles.itemPrice}>${Number(item.price).toFixed(2)}</p>

                  <div style={styles.actions}>
                    <div style={styles.qtyBox}>
                      <button
                        style={styles.qtyBtn}
                        onClick={() => decreaseQuantity(item.id)}
                      >
                        −
                      </button>

                      <span style={styles.qtyValue}>{item.quantity}</span>

                      <button
                        style={styles.qtyBtn}
                        onClick={() => increaseQuantity(item.id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      style={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <div style={styles.subtotal}>
                  ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.summaryRow}>
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${Number(totalPrice).toFixed(2)}</span>
            </div>

            <div style={styles.summaryDivider}></div>

            <div style={styles.totalRow}>
              <span>Total</span>
              <span>${Number(totalPrice).toFixed(2)}</span>
            </div>

            <Link to="/checkout" style={styles.checkoutBtn}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
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
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  label: {
    margin: "0 0 8px",
    color: theme.colors.accent,
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  heading: {
    margin: 0,
    fontSize: "40px",
    fontWeight: "800",
    color: theme.colors.text,
  },
  clearBtnTop: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "14px",
    backgroundColor: theme.colors.danger,
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
    boxShadow: theme.shadow.sm,
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1.8fr 0.9fr",
    gap: "26px",
    alignItems: "start",
  },
  itemsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  summary: {
    position: "sticky",
    top: "100px",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.lg,
    padding: "24px",
    backgroundColor: theme.colors.surface,
    boxShadow: theme.shadow.md,
  },
  summaryTitle: {
    marginTop: 0,
    marginBottom: "20px",
    fontSize: "24px",
    color: theme.colors.text,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "14px",
    color: theme.colors.textMuted,
    fontSize: "15px",
  },
  summaryDivider: {
    height: "1px",
    backgroundColor: theme.colors.border,
    margin: "18px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "800",
    color: theme.colors.text,
  },
  checkoutBtn: {
    display: "block",
    textAlign: "center",
    textDecoration: "none",
    padding: "14px 18px",
    borderRadius: "16px",
    background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
    color: "#fff",
    fontWeight: "800",
    boxShadow: theme.shadow.sm,
  },
  card: {
    display: "grid",
    gridTemplateColumns: "140px 1fr auto",
    gap: "20px",
    alignItems: "center",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: theme.radius.md,
    padding: "18px",
    backgroundColor: theme.colors.surface,
    boxShadow: theme.shadow.sm,
  },
  imageWrap: {
    width: "140px",
    height: "140px",
    borderRadius: "18px",
    backgroundColor: theme.colors.surfaceSoft,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "14px",
  },
  info: {
    minWidth: 0,
  },
  brand: {
    margin: "0 0 8px",
    fontSize: "13px",
    fontWeight: "700",
    color: theme.colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: "0.4px",
  },
  name: {
    margin: "0 0 10px",
    fontSize: "22px",
    color: theme.colors.text,
  },
  itemPrice: {
    margin: "0 0 14px",
    color: theme.colors.text,
    fontSize: "18px",
    fontWeight: "700",
  },
  actions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  qtyBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    borderRadius: "14px",
    backgroundColor: theme.colors.surfaceSoft,
    border: `1px solid ${theme.colors.border}`,
  },
  qtyBtn: {
    width: "36px",
    height: "36px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: theme.colors.primary,
    color: "#fff",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "700",
  },
  qtyValue: {
    minWidth: "20px",
    textAlign: "center",
    fontWeight: "800",
    color: theme.colors.text,
  },
  removeBtn: {
    padding: "10px 14px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#FEECEC",
    color: theme.colors.danger,
    cursor: "pointer",
    fontWeight: "700",
  },
  subtotal: {
    fontWeight: "800",
    color: theme.colors.text,
    fontSize: "20px",
    minWidth: "110px",
    textAlign: "right",
  },
  emptyContainer: {
    maxWidth: "700px",
    margin: "60px auto",
    padding: "60px 30px",
    textAlign: "center",
    borderRadius: theme.radius.lg,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.md,
  },
  emptyIcon: {
    fontSize: "52px",
    marginBottom: "14px",
  },
  emptyTitle: {
    margin: "0 0 12px",
    color: theme.colors.text,
    fontSize: "36px",
  },
  emptyText: {
    margin: "0 0 22px",
    color: theme.colors.textMuted,
    fontSize: "16px",
  },
  shopBtn: {
    display: "inline-block",
    padding: "14px 22px",
    borderRadius: "16px",
    textDecoration: "none",
    background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
    color: "#fff",
    fontWeight: "800",
    boxShadow: theme.shadow.sm,
  },
};

export default Cart;