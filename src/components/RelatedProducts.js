import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import { getRelatedProducts } from "../services/productService";
import { theme } from "../styles/theme";

function RelatedProducts({ category, currentProductId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!category || !currentProductId) return;

      try {
        setLoading(true);
        const data = await getRelatedProducts(category, currentProductId);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [category, currentProductId]);

  if (!loading && products.length === 0) return null;

  return (
    <section style={styles.container} className="fade-up">
      <div style={styles.header}>
        <p style={styles.label}>Recommended</p>
        <h2 style={styles.heading}>You may also like</h2>
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
  container: {
    marginTop: "34px",
  },

  header: {
    marginBottom: "18px",
  },

  label: {
    margin: "0 0 8px",
    color: theme.colors.accent,
    fontSize: "13px",
    fontWeight: 950,
    textTransform: "uppercase",
    letterSpacing: ".6px",
  },

  heading: {
    margin: 0,
    fontSize: "32px",
    fontWeight: 950,
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "22px",
  },
};

export default RelatedProducts;