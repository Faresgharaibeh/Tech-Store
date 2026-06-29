import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsByCategory } from "../services/productService";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { theme } from "../styles/theme";

function CategorySection({ title, category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductsByCategory(category);
        setProducts(data);
      } catch (error) {
        console.error("Error loading category:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return (
    <section style={styles.section} className="fade-up">
      <div style={styles.header}>
        <div>
          <p style={styles.label}>Category</p>
          <h2 style={styles.title}>{title}</h2>
        </div>

        <Link
          to={`/products?category=${encodeURIComponent(category)}`}
          style={styles.link}
        >
          View more →
        </Link>
      </div>

      <div style={styles.grid} className="product-grid">
        {loading
          ? [...Array(4)].map((_, index) => <SkeletonCard key={index} />)
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    marginTop: "40px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
    marginBottom: "18px",
    gap: "16px",
    flexWrap: "wrap",
  },

  label: {
    margin: "0 0 8px",
    color: theme.colors.accent,
    fontSize: "13px",
    fontWeight: 950,
    textTransform: "uppercase",
    letterSpacing: ".6px",
  },

  title: {
    margin: 0,
    fontSize: "32px",
    fontWeight: 950,
  },

  link: {
    color: theme.colors.accent,
    textDecoration: "none",
    fontWeight: 900,
    padding: "10px 14px",
    borderRadius: "14px",
    background: "rgba(59,130,246,.08)",
  },

  grid: {
    display: "flex",
    gap: "22px",
    flexWrap: "wrap",
  },
};

export default CategorySection;