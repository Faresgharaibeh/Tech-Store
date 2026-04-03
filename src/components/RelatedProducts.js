import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getRelatedProducts } from "../services/productService";

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

  if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>You may also like</h2>
        <p>Loading related products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>You may also like</h2>

      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "50px",
  },
  heading: {
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
};

export default RelatedProducts;