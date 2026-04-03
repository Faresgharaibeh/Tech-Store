import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrder } from "../services/orderService";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { theme } from "../styles/theme";

function Checkout() {
  const navigate = useNavigate();
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
  });

  const [loading, setLoading] = useState(false);
  const [successOrderId, setSuccessOrderId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uid) return toast.error("Login required");
    if (cartItems.length === 0) return toast.error("Cart is empty");

    try {
      setLoading(true);

      const orderData = {
        customer: {
          fullName: formData.fullName || "",
          phone: formData.phone || "",
          address: formData.address || "",
          city: formData.city || "",
          notes: formData.notes || "",
          email: user.email || "",
          uid: user.uid || "",
        },
        payment: {
          method: formData.paymentMethod,
          cardNumberLast4:
            formData.paymentMethod === "credit_card"
              ? formData.cardNumber.slice(-4)
              : "",
        },
        items: cartItems,
        totalPrice,
      };

      const orderId = await createOrder(orderData);

      setSuccessOrderId(orderId);
      clearCart();
      toast.success("Order placed 🎉");
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (successOrderId) {
    return (
      <div style={styles.success}>
        <h1>Order Successful 🎉</h1>
        <p>ID: {successOrderId}</p>

        <div style={styles.actions}>
          <Link to="/" style={styles.btn}>Home</Link>
          <Link to="/my-orders" style={styles.btn}>My Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* LEFT */}
        <div style={styles.formCard}>
          <h1 style={styles.heading}>Checkout</h1>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input name="fullName" placeholder="Full Name" onChange={handleChange} style={styles.input}/>
            <input name="phone" placeholder="Phone" onChange={handleChange} style={styles.input}/>
            <input name="address" placeholder="Address" onChange={handleChange} style={styles.input}/>
            <input name="city" placeholder="City" onChange={handleChange} style={styles.input}/>
            <textarea name="notes" placeholder="Notes" onChange={handleChange} style={styles.textarea}/>

            {/* Payment */}
            <div style={styles.payment}>
              <h3>Payment Method</h3>

              {["cash_on_delivery","credit_card","paypal"].map((method) => (
                <label key={method} style={styles.radio}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method}
                    checked={formData.paymentMethod === method}
                    onChange={handleChange}
                  />
                  {method.replace("_"," ")}
                </label>
              ))}
            </div>

            <button style={styles.submit} disabled={loading}>
              {loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div style={styles.summary}>
          <h2>Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} style={styles.row}>
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <h3>Total: ${totalPrice.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: theme.colors.background,
    padding: "30px",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "30px",
    maxWidth: "1200px",
    margin: "auto",
  },
  formCard: {
    background: "#fff",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: theme.shadow.md,
  },
  heading: {
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  input: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
  },
  textarea: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #ddd",
  },
  payment: {
    marginTop: "10px",
  },
  radio: {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
  },
  submit: {
    marginTop: "20px",
    padding: "14px",
    borderRadius: "14px",
    border: "none",
    background: theme.colors.accent,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
  summary: {
    background: "#fff",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: theme.shadow.md,
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  success: {
    textAlign: "center",
    padding: "60px",
  },
  actions: {
    marginTop: "20px",
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  btn: {
    padding: "12px 20px",
    background: "#111",
    color: "#fff",
    borderRadius: "10px",
    textDecoration: "none",
  },
};

export default Checkout;