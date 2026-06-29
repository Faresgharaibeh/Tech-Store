import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { theme } from "../styles/theme";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
    paymentMethod: "cash_on_delivery",

    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",

    paypalEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState("");

  const shipping = cartItems.length > 0 ? 7.99 : 0;
  const grandTotal = totalPrice + shipping;

  const formatCardNumber = (value) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 16);
    return numbersOnly.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiryDate = (value) => {
    const numbersOnly = value.replace(/\D/g, "").slice(0, 4);

    if (numbersOnly.length >= 3) {
      return `${numbersOnly.slice(0, 2)}/${numbersOnly.slice(2)}`;
    }

    return numbersOnly;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "cardNumber") {
      setFormData((prev) => ({
        ...prev,
        cardNumber: formatCardNumber(value),
      }));
      return;
    }

    if (name === "expiryDate") {
      setFormData((prev) => ({
        ...prev,
        expiryDate: formatExpiryDate(value),
      }));
      return;
    }

    if (name === "cvv") {
      setFormData((prev) => ({
        ...prev,
        cvv: value.replace(/\D/g, "").slice(0, 4),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateElectronicPayment = () => {
    if (formData.paymentMethod === "credit_card") {
      const cleanCardNumber = formData.cardNumber.replace(/\s/g, "");

      if (!formData.cardName.trim()) {
        toast.error("Card holder name is required");
        return false;
      }

      if (cleanCardNumber.length < 13 || cleanCardNumber.length > 16) {
        toast.error("Please enter a valid card number");
        return false;
      }

      if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        toast.error("Please enter expiry date as MM/YY");
        return false;
      }

      if (formData.cvv.length < 3) {
        toast.error("Please enter a valid CVV");
        return false;
      }
    }

    if (formData.paymentMethod === "paypal") {
      if (!formData.paypalEmail.trim()) {
        toast.error("PayPal email is required");
        return false;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.paypalEmail)) {
        toast.error("Please enter a valid PayPal email");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user?.uid) {
      toast.error("Login required");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return;
    }

    if (!formData.phone.trim()) {
      toast.error("Phone is required");
      return;
    }

    if (!formData.address.trim()) {
      toast.error("Address is required");
      return;
    }

    if (!formData.city.trim()) {
      toast.error("City is required");
      return;
    }

    if (!validateElectronicPayment()) {
      return;
    }

    try {
      setLoading(true);

      const cleanCardNumber = formData.cardNumber.replace(/\s/g, "");

      const orderData = {
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          notes: formData.notes,
          email: user.email || "",
          uid: user.uid,
        },

        payment: {
          method: formData.paymentMethod,
          status:
            formData.paymentMethod === "cash_on_delivery"
              ? "pending_cash_on_delivery"
              : "pending_electronic_payment",

          cardHolderName:
            formData.paymentMethod === "credit_card" ? formData.cardName : "",

          cardNumberLast4:
            formData.paymentMethod === "credit_card"
              ? cleanCardNumber.slice(-4)
              : "",

          expiryDate:
            formData.paymentMethod === "credit_card"
              ? formData.expiryDate
              : "",

          paypalEmail:
            formData.paymentMethod === "paypal"
              ? formData.paypalEmail
              : "",
        },

        items: cartItems,
        subtotal: totalPrice,
        shipping,
        totalPrice: grandTotal,
      };

      const orderId = await createOrder(orderData);

      setSuccessOrderId(orderId);
      clearCart();
      toast.success("Order placed 🎉");
    } catch (error) {
      console.error("Failed to place order:", error);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (successOrderId) {
    return (
      <main className="page-wrap">
        <div className="container-xl">
          <section style={styles.success} className="fade-up">
            <div style={styles.successIcon}>🎉</div>
            <h1 style={styles.successTitle}>Order Successful</h1>
            <p style={styles.successText}>
              Your order has been placed successfully. You can track it from My
              Orders.
            </p>

            <div style={styles.orderIdBox}>
              <span>Order ID</span>
              <strong>{successOrderId}</strong>
            </div>

            <div style={styles.successActions}>
              <Link to="/" style={styles.secondarySuccessBtn}>
                Home
              </Link>

              <Link to="/my-orders" style={styles.primarySuccessBtn}>
                My Orders
              </Link>
            </div>
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
            <span style={styles.kicker}>Checkout</span>
            <h1 style={styles.title}>Complete your order</h1>
            <p style={styles.subtitle}>
              Enter your shipping information and select your preferred payment
              method.
            </p>
          </div>
        </section>

        <div style={styles.stepper} className="fade-up">
          <div style={styles.stepDone}>1. Cart</div>
          <div style={styles.stepLine}></div>
          <div style={styles.stepActive}>2. Checkout</div>
          <div style={styles.stepLine}></div>
          <div style={styles.step}>3. Success</div>
        </div>

        <section
          className="responsive-checkout"
          style={styles.layout}
        >
          <form onSubmit={handleSubmit} style={styles.formCard} className="fade-up">
            <div style={styles.sectionHeader}>
              <div style={styles.sectionIcon}>🚚</div>
              <div>
                <h2 style={styles.sectionTitle}>Shipping Information</h2>
                <p style={styles.sectionText}>
                  Tell us where we should deliver your order.
                </p>
              </div>
            </div>

            <div style={styles.formGrid}>
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  gridColumn: "1 / -1",
                }}
              />

              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                style={styles.input}
              />

              <textarea
                name="notes"
                placeholder="Notes"
                value={formData.notes}
                onChange={handleChange}
                style={{
                  ...styles.textarea,
                  gridColumn: "1 / -1",
                }}
              />
            </div>

            <div style={styles.paymentSection}>
              <div style={styles.sectionHeader}>
                <div style={styles.sectionIcon}>💳</div>
                <div>
                  <h2 style={styles.sectionTitle}>Payment Method</h2>
                  <p style={styles.sectionText}>
                    Choose cash on delivery, Visa card, or PayPal.
                  </p>
                </div>
              </div>

              <div style={styles.paymentGrid}>
                <label
                  style={{
                    ...styles.paymentOption,
                    ...(formData.paymentMethod === "cash_on_delivery"
                      ? styles.paymentOptionActive
                      : {}),
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === "cash_on_delivery"}
                    onChange={handleChange}
                    style={styles.hiddenRadio}
                  />
                  <span style={styles.paymentIcon}>🚚</span>
                  <strong>Cash</strong>
                  <small>Pay when delivered</small>
                </label>

                <label
                  style={{
                    ...styles.paymentOption,
                    ...(formData.paymentMethod === "credit_card"
                      ? styles.paymentOptionActive
                      : {}),
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={formData.paymentMethod === "credit_card"}
                    onChange={handleChange}
                    style={styles.hiddenRadio}
                  />
                  <span style={styles.paymentIcon}>💳</span>
                  <strong>Visa Card</strong>
                  <small>Electronic payment</small>
                </label>

                <label
                  style={{
                    ...styles.paymentOption,
                    ...(formData.paymentMethod === "paypal"
                      ? styles.paymentOptionActive
                      : {}),
                  }}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === "paypal"}
                    onChange={handleChange}
                    style={styles.hiddenRadio}
                  />
                  <span style={styles.paymentIcon}>🅿️</span>
                  <strong>PayPal</strong>
                  <small>Use PayPal email</small>
                </label>
              </div>

              {formData.paymentMethod === "credit_card" && (
                <div style={styles.paymentDetailsBox} className="fade-up">
                  <div style={styles.cardPreview}>
                    <div>
                      <span style={styles.cardLabel}>Tech Store Card</span>
                      <p style={styles.cardNumber}>
                        {formData.cardNumber || "•••• •••• •••• ••••"}
                      </p>
                    </div>

                    <div style={styles.cardFooter}>
                      <span>{formData.cardName || "CARD HOLDER"}</span>
                      <span>{formData.expiryDate || "MM/YY"}</span>
                    </div>
                  </div>

                  <input
                    name="cardName"
                    placeholder="Card Holder Name"
                    value={formData.cardName}
                    onChange={handleChange}
                    style={styles.input}
                  />

                  <input
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    style={styles.input}
                    inputMode="numeric"
                  />

                  <div style={styles.cardRow}>
                    <input
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      style={styles.input}
                      inputMode="numeric"
                    />

                    <input
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleChange}
                      style={styles.input}
                      inputMode="numeric"
                    />
                  </div>

                  <p style={styles.paymentNote}>
                    CVV is validated only on the form and is not saved in the
                    order data.
                  </p>
                </div>
              )}

              {formData.paymentMethod === "paypal" && (
                <div style={styles.paymentDetailsBox} className="fade-up">
                  <input
                    name="paypalEmail"
                    placeholder="PayPal Email"
                    value={formData.paypalEmail}
                    onChange={handleChange}
                    style={styles.input}
                    type="email"
                  />

                  <p style={styles.paymentNote}>
                    We will use this PayPal email to confirm your electronic
                    payment.
                  </p>
                </div>
              )}
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>

          <aside style={styles.summary} className="sticky-card fade-up">
            <h2 style={styles.summaryTitle}>Order Summary</h2>

            <div style={styles.summaryItems}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.summaryItem}>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <strong>
                    ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>

            <div style={styles.divider}></div>

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <strong>${totalPrice.toFixed(2)}</strong>
            </div>

            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <strong>${shipping.toFixed(2)}</strong>
            </div>

            <div style={styles.totalRow}>
              <span>Total</span>
              <strong>${grandTotal.toFixed(2)}</strong>
            </div>

            <Link to="/cart" style={styles.backToCart}>
              ← Back to cart
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

  stepDone: {
    padding: "10px 14px",
    borderRadius: theme.radius.full,
    background: "rgba(16,185,129,.10)",
    color: theme.colors.success,
    fontWeight: 950,
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
    gridTemplateColumns: "1fr 380px",
    gap: "24px",
    alignItems: "start",
  },

  formCard: {
    padding: "26px",
    borderRadius: theme.radius.xl,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
  },

  sectionHeader: {
    display: "flex",
    gap: "14px",
    alignItems: "center",
    marginBottom: "18px",
  },

  sectionIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(145deg, #EEF2FF, #FFFFFF)",
    fontSize: "25px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 950,
  },

  sectionText: {
    margin: "4px 0 0",
    color: theme.colors.textMuted,
    fontWeight: 600,
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },

  input: {
    width: "100%",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "16px",
    padding: "14px",
    outline: "none",
    background: "#fff",
  },

  textarea: {
    width: "100%",
    minHeight: "85px",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "16px",
    padding: "14px",
    outline: "none",
    resize: "vertical",
  },

  paymentSection: {
    marginTop: "28px",
  },

  paymentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
  },

  paymentOption: {
    cursor: "pointer",
    padding: "18px",
    borderRadius: theme.radius.lg,
    border: `1px solid ${theme.colors.border}`,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    transition: theme.transition,
  },

  paymentOptionActive: {
    borderColor: theme.colors.accent,
    boxShadow: "0 16px 34px rgba(59,130,246,.18)",
    background: "linear-gradient(145deg, #FFFFFF, #EEF2FF)",
  },

  hiddenRadio: {
    display: "none",
  },

  paymentIcon: {
    fontSize: "28px",
  },

  paymentDetailsBox: {
    marginTop: "18px",
    padding: "20px",
    borderRadius: theme.radius.lg,
    background: theme.colors.surfaceSoft,
    border: `1px solid ${theme.colors.border}`,
    display: "grid",
    gap: "13px",
  },

  cardPreview: {
    minHeight: "190px",
    borderRadius: "24px",
    padding: "22px",
    background: theme.gradients.hero,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: theme.shadow.md,
  },

  cardLabel: {
    color: "#CBD5E1",
    fontWeight: 850,
  },

  cardNumber: {
    margin: "24px 0 0",
    fontSize: "25px",
    letterSpacing: "2px",
    fontWeight: 900,
  },

  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    color: "#E0E7FF",
    fontWeight: 850,
  },

  cardRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  paymentNote: {
    margin: 0,
    color: theme.colors.textMuted,
    fontSize: "13px",
    lineHeight: 1.6,
    fontWeight: 700,
  },

  submitBtn: {
    width: "100%",
    marginTop: "26px",
    border: "none",
    borderRadius: "18px",
    padding: "16px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: "0 18px 38px rgba(59,130,246,.25)",
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
    margin: "0 0 18px",
    fontSize: "24px",
    fontWeight: 950,
  },

  summaryItems: {
    display: "grid",
    gap: "12px",
    maxHeight: "290px",
    overflow: "auto",
    paddingRight: "4px",
  },

  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    color: theme.colors.textMuted,
    fontWeight: 750,
  },

  divider: {
    height: "1px",
    background: theme.colors.border,
    margin: "18px 0",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "14px",
    color: theme.colors.textMuted,
    fontWeight: 850,
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "22px",
    fontWeight: 950,
  },

  backToCart: {
    display: "block",
    marginTop: "18px",
    textAlign: "center",
    color: theme.colors.accent,
    textDecoration: "none",
    fontWeight: 900,
  },

  success: {
    minHeight: "620px",
    borderRadius: theme.radius.xl,
    background: "linear-gradient(135deg, #FFFFFF, #EEF2FF)",
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "40px",
  },

  successIcon: {
    width: "96px",
    height: "96px",
    borderRadius: "32px",
    display: "grid",
    placeItems: "center",
    fontSize: "48px",
    background: "#fff",
    boxShadow: theme.shadow.md,
    margin: "0 auto 20px",
  },

  successTitle: {
    margin: 0,
    fontSize: "44px",
    fontWeight: 950,
  },

  successText: {
    maxWidth: "540px",
    margin: "14px auto 20px",
    color: theme.colors.textMuted,
    lineHeight: 1.7,
    fontWeight: 600,
  },

  orderIdBox: {
    display: "inline-flex",
    flexDirection: "column",
    gap: "5px",
    padding: "16px 22px",
    borderRadius: "18px",
    background: "#fff",
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
  },

  successActions: {
    marginTop: "24px",
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },

  secondarySuccessBtn: {
    textDecoration: "none",
    padding: "14px 22px",
    borderRadius: "16px",
    background: "#fff",
    border: `1px solid ${theme.colors.border}`,
    color: theme.colors.text,
    fontWeight: 950,
  },

  primarySuccessBtn: {
    textDecoration: "none",
    padding: "14px 22px",
    borderRadius: "16px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 950,
  },
};

export default Checkout;