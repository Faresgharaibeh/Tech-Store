import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProductsByCategory } from "../services/productService";
import { Link } from "react-router-dom";
import { theme } from "../styles/theme";

const categories = [
  "Phones",
  "Headphones",
  "Cases",
  "Chargers",
  "Laptops",
  "Computers",
  "Keyboard",
  "Mouse",
  "MousePad",
];

function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = {};

      for (let category of categories) {
        const products = await getProductsByCategory(category);
        result[category] = products;
      }

      setData(result);
    };

    fetchData();
  }, []);

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.badge}>Next Generation Tech Shopping</span>

          <h1 style={styles.mainTitle}>
            Discover Premium Tech
            <br />
            Built for Modern Life
          </h1>

          <p style={styles.subtitle}>
            Shop the latest phones, laptops, accessories, and gaming gear
            with a clean and powerful experience designed for tech lovers.
          </p>

          <div style={styles.heroActions}>
            <Link to="/products" style={styles.primaryBtn}>
              Shop Now
            </Link>

            <Link to="/wishlist" style={styles.secondaryBtn}>
              View Wishlist
            </Link>
          </div>
        </div>

        <div style={styles.heroCard}>
          <div style={styles.heroGlow}></div>
          <h3 style={styles.heroCardTitle}>Smart Deals</h3>
          <p style={styles.heroCardText}>
            Trending devices, modern accessories, and top performance products
            all in one store.
          </p>
        </div>
      </section>

      {categories.map((cat) => (
        <section key={cat} style={styles.section}>
          <div style={styles.sectionHeader}>
            <div>
              <p style={styles.sectionLabel}>Category</p>
              <h2 style={styles.categoryTitle}>{cat}</h2>
            </div>

            <Link to="/products" style={styles.viewMore}>
              View more →
            </Link>
          </div>

          <div style={styles.grid}>
            {data[cat]?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const styles = {
  page: {
    padding: "28px",
    backgroundColor: theme.colors.background,
    minHeight: "100vh",
  },

  /* 🔥 HERO */
  hero: {
    maxWidth: "1400px",
    margin: "0 auto 40px",
    minHeight: "420px",
    borderRadius: theme.radius.lg,
    padding: "48px",
    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primarySoft} 60%, ${theme.colors.accentSoft} 140%)`,
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "30px",
    flexWrap: "wrap",
    boxShadow: theme.shadow.lg,
    position: "relative",
    overflow: "hidden",
  },

  heroContent: {
    flex: 1,
    minWidth: "300px",
    maxWidth: "700px",
    zIndex: 2,
  },

  badge: {
    display: "inline-block",
    marginBottom: "18px",
    padding: "8px 14px",
    borderRadius: "999px",
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)",
    fontSize: "13px",
    fontWeight: "700",
  },

  mainTitle: {
    fontSize: "56px",
    lineHeight: "1.1",
    margin: "0 0 18px",
    fontWeight: "800",
    color: "#fff", // ✅ أهم تعديل
    textShadow: "0 4px 20px rgba(0,0,0,0.3)", // 🔥 تحسين
  },

  subtitle: {
    fontSize: "18px",
    lineHeight: "1.8",
    color: "#dbe4f0", // ✅ لون واضح
    marginBottom: "28px",
  },

  heroActions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    padding: "14px 22px",
    borderRadius: "14px",
    background: `linear-gradient(135deg, ${theme.colors.accent}, ${theme.colors.accentSoft})`,
    color: "#fff",
    fontWeight: "700",
    textDecoration: "none",
  },

  secondaryBtn: {
    padding: "14px 22px",
    borderRadius: "14px",
    backgroundColor: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#fff",
    fontWeight: "700",
    textDecoration: "none",
  },

  heroCard: {
    width: "320px",
    borderRadius: "24px",
    padding: "28px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.15)",
  },

  heroGlow: {
    position: "absolute",
    top: "-50px",
    right: "-40px",
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background: "rgba(59,130,246,0.25)",
    filter: "blur(40px)",
  },

  heroCardTitle: {
    fontSize: "24px",
    marginBottom: "14px",
    fontWeight: "800",
    color: "#fff",
  },

  heroCardText: {
    color: "#dbe4f0",
  },

  section: {
    maxWidth: "1400px",
    margin: "0 auto 42px",
  },

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },

  sectionLabel: {
    color: theme.colors.accent,
    fontWeight: "700",
  },

  categoryTitle: {
    color: theme.colors.text,
    fontSize: "30px",
    fontWeight: "800",
  },

  viewMore: {
    color: theme.colors.text,
    textDecoration: "none",
  },

  grid: {
    display: "flex",
    gap: "22px",
    flexWrap: "wrap",
  },
};

export default Home;