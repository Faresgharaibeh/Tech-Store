import { Link } from "react-router-dom";
import { productImages } from "../data/productImages";
import { useCart } from "../context/CartContext";
import { theme } from "../styles/theme";

function Cart() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  const shipping = cartItems.length > 0 ? 7.99 : 0;
  const grandTotal = totalPrice + shipping;

  if (cartItems.length === 0) {
    return (
      <main className="page-wrap">
        <div className="container-xl">
          <section style={styles.emptyState} className="fade-up">
            <div style={styles.emptyIcon}>🛒</div>
            <h1 style={styles.emptyTitle}>Your cart is empty</h1>
            <p style={styles.emptyText}>
              Looks like you have not added anything yet. Start shopping and
              build your perfect tech setup.
            </p>

            <Link to="/products" style={styles.primaryBtn}>
              Start Shopping
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
            <span style={styles.kicker}>Shopping Cart</span>
            <h1 style={styles.title}>Review your selected products</h1>
            <p style={styles.subtitle}>
              Adjust quantities, remove items, then continue to checkout.
            </p>
          </div>

          <button onClick={clearCart} style={styles.clearBtn}>
            Clear Cart
          </button>
        </section>

        <div style={styles.stepper} className="fade-up">
          <div style={styles.stepActive}>1. Cart</div>
          <div style={styles.stepLine}></div>
          <div style={styles.step}>2. Checkout</div>
          <div style={styles.stepLine}></div>
          <div style={styles.step}>3. Success</div>
        </div>

        <section
          className="responsive-grid-cart"
          style={styles.layout}
        >
          <div style={styles.items}>
            {cartItems.map((item) => {
              const image = productImages[item.name];

              return (
                <article
                  key={item.id}
                  style={styles.itemCard}
                  className="cart-item-card fade-up"
                >
                  <div style={styles.imageWrap}>
                    <img src={image} alt={item.name} style={styles.image} />
                  </div>

                  <div>
                    <p style={styles.category}>{item.category}</p>
                    <h3 style={styles.itemTitle}>{item.name}</h3>
                    <p style={styles.itemPrice}>
                      ${Number(item.price || 0).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={styles.removeBtn}
                    >
                      Remove
                    </button>
                  </div>

                  <div style={styles.quantityBox}>
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      style={styles.qtyBtn}
                    >
                      -
                    </button>

                    <span style={styles.qtyValue}>{item.quantity}</span>

                    <button
                      onClick={() => increaseQuantity(item.id)}
                      style={styles.qtyBtn}
                    >
                      +
                    </button>
                  </div>

                  <div style={styles.subtotal} className="cart-subtotal">
                    <span>Subtotal</span>
                    <strong>
                      ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                </article>
              );
            })}
          </div>

          <aside style={styles.summary} className="sticky-card fade-up">
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.summaryRow}>
              <span>Items</span>
              <strong>{cartItems.length}</strong>
            </div>

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <strong>${shipping.toFixed(2)}</strong>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.totalRow}>
              <span>Total</span>
              <strong>${grandTotal.toFixed(2)}</strong>
            </div>

            <Link to="/checkout" style={styles.checkoutBtn}>
              Continue to Checkout
            </Link>

            <Link to="/products" style={styles.continueLink}>
              ← Continue Shopping
            </Link>
          </aside>
        </section>
      </div>
    </main>
  );
}

const styles = {
  header: {
    marginBottom: "20px",
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
    color: theme.colors.accent,
    fontWeight: 950,
    textTransform: "uppercase",
    fontSize: "13px",
    letterSpacing: ".6px",
  },

  title: {
    margin: "10px 0 10px",
    fontSize: "40px",
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

  stepper: {
    marginBottom: "22px",
    padding: "16px",
    borderRadius: theme.radius.lg,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  stepActive: {
    padding: "10px 14px",
    borderRadius: theme.radius.full,
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 950,
  },

  step: {
    padding: "10px 14px",
    borderRadius: theme.radius.full,
    background: theme.colors.surfaceSoft,
    color: theme.colors.textMuted,
    fontWeight: 850,
  },

  stepLine: {
    flex: 1,
    minWidth: "40px",
    height: "2px",
    background: theme.colors.border,
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 360px",
    gap: "24px",
    alignItems: "start",
  },

  items: {
    display: "grid",
    gap: "16px",
  },

  itemCard: {
    display: "grid",
    gridTemplateColumns: "140px 1fr 150px 140px",
    gap: "18px",
    alignItems: "center",
    padding: "16px",
    borderRadius: theme.radius.lg,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
  },

  imageWrap: {
    height: "120px",
    borderRadius: "22px",
    background: "linear-gradient(145deg, #EEF2FF, #FFFFFF)",
    display: "grid",
    placeItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "16px",
  },

  category: {
    margin: "0 0 7px",
    color: theme.colors.accent,
    fontWeight: 900,
    fontSize: "13px",
  },

  itemTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 950,
  },

  itemPrice: {
    margin: "8px 0 12px",
    color: theme.colors.textMuted,
    fontWeight: 800,
  },

  removeBtn: {
    border: "none",
    borderRadius: "12px",
    padding: "9px 12px",
    background: "rgba(239,68,68,.10)",
    color: theme.colors.danger,
    fontWeight: 900,
    cursor: "pointer",
  },

  quantityBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "18px",
    background: theme.colors.surfaceSoft,
    padding: "7px",
  },

  qtyBtn: {
    width: "40px",
    height: "40px",
    borderRadius: "14px",
    border: "none",
    background: "#fff",
    fontWeight: 950,
    cursor: "pointer",
  },

  qtyValue: {
    fontWeight: 950,
  },

  subtotal: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    color: theme.colors.textMuted,
    fontWeight: 800,
  },

  summary: {
    position: "sticky",
    top: "96px",
    padding: "24px",
    borderRadius: theme.radius.xl,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.md,
  },

  summaryTitle: {
    margin: "0 0 20px",
    fontSize: "24px",
    fontWeight: 950,
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "14px",
    color: theme.colors.textMuted,
    fontWeight: 800,
  },

  divider: {
    height: "1px",
    background: theme.colors.border,
    margin: "18px 0",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "22px",
    fontWeight: 950,
  },

  checkoutBtn: {
    display: "block",
    marginTop: "22px",
    textAlign: "center",
    textDecoration: "none",
    borderRadius: "18px",
    padding: "15px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 950,
    boxShadow: "0 18px 38px rgba(59,130,246,.25)",
  },

  continueLink: {
    display: "block",
    marginTop: "14px",
    textAlign: "center",
    color: theme.colors.accent,
    textDecoration: "none",
    fontWeight: 900,
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
    fontSize: "44px",
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
    maxWidth: "540px",
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

export default Cart;