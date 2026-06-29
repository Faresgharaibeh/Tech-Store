import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { theme } from "../styles/theme";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await login(formData.email, formData.password);
      toast.success("Welcome back");
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-wrap">
      <div className="container-xl">
        <section style={styles.shell} className="fade-up">
          <div style={styles.visual}>
            <span style={styles.kicker}>Welcome Back</span>
            <h1 style={styles.visualTitle}>Login to continue shopping</h1>
            <p style={styles.visualText}>
              Access your wishlist, cart, orders and checkout faster with your
              account.
            </p>

            <div style={styles.featureList}>
              <div style={styles.featureItem}>🛒 Saved cart experience</div>
              <div style={styles.featureItem}>❤️ Favorite products</div>
              <div style={styles.featureItem}>📦 Track your orders</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={styles.formCard}>
            <h2 style={styles.formTitle}>Sign In</h2>
            <p style={styles.formText}>
              Enter your email and password to access your account.
            </p>

            <label style={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />

            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <p style={styles.switchText}>
              Do not have an account?{" "}
              <Link to="/register" style={styles.switchLink}>
                Create one
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

const styles = {
  shell: {
    minHeight: "650px",
    display: "grid",
    gridTemplateColumns: "1fr 460px",
    borderRadius: theme.radius.xl,
    overflow: "hidden",
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.lg,
  },

  visual: {
    padding: "54px",
    background: theme.gradients.hero,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  kicker: {
    display: "inline-flex",
    width: "fit-content",
    padding: "9px 14px",
    borderRadius: theme.radius.full,
    background: "rgba(255,255,255,.12)",
    border: "1px solid rgba(255,255,255,.16)",
    color: "#DBEAFE",
    fontWeight: 950,
    marginBottom: "20px",
  },

  visualTitle: {
    margin: 0,
    maxWidth: "620px",
    fontSize: "54px",
    lineHeight: 1.05,
    letterSpacing: "-1.8px",
    fontWeight: 950,
  },

  visualText: {
    maxWidth: "560px",
    margin: "20px 0 28px",
    color: "#CBD5E1",
    lineHeight: 1.75,
    fontWeight: 600,
  },

  featureList: {
    display: "grid",
    gap: "12px",
  },

  featureItem: {
    width: "fit-content",
    padding: "12px 15px",
    borderRadius: "16px",
    background: "rgba(255,255,255,.10)",
    border: "1px solid rgba(255,255,255,.14)",
    fontWeight: 850,
  },

  formCard: {
    padding: "44px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  formTitle: {
    margin: 0,
    fontSize: "34px",
    fontWeight: 950,
  },

  formText: {
    margin: "10px 0 26px",
    color: theme.colors.textMuted,
    lineHeight: 1.65,
    fontWeight: 600,
  },

  label: {
    marginBottom: "8px",
    fontWeight: 900,
    color: theme.colors.text,
  },

  input: {
    width: "100%",
    marginBottom: "16px",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "16px",
    padding: "14px",
    outline: "none",
    background: "#fff",
  },

  submitBtn: {
    marginTop: "8px",
    border: "none",
    borderRadius: "18px",
    padding: "15px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 950,
    cursor: "pointer",
    boxShadow: "0 18px 38px rgba(59,130,246,.25)",
  },

  switchText: {
    margin: "20px 0 0",
    color: theme.colors.textMuted,
    textAlign: "center",
    fontWeight: 700,
  },

  switchLink: {
    color: theme.colors.accent,
    fontWeight: 950,
    textDecoration: "none",
  },
};

export default Login;