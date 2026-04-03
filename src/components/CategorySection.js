import { useEffect, useState } from "react";
import { getProductsByCategory } from "../services/productService";
import ProductCard from "./ProductCard";

function CategorySection({ title, category }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductsByCategory(category);
      setProducts(data);
    };

    fetchData();
  }, [category]);

  return (
    <section style={{ marginTop: "40px" }}>
      <h2>{title}</h2>
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

const styles = {
  grid: {
    display: "flex",
    gap: "20px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
};

export default CategorySection;