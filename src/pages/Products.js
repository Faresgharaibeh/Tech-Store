import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { getAllProducts } from "../services/productService";
import { theme } from "../styles/theme";

const categories = [
  "All",
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

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("default");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortType === "price-low-high") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortType === "price-high-low") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortType === "name-a-z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "name-z-a") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [products, selectedCategory, searchTerm, sortType]);

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.hero}>
            <p style={styles.heroLabel}>Explore Collection</p>
            <h1 style={styles.heading}>All Products</h1>
            <p style={styles.heroText}>
              Discover premium devices, accessories, and modern tech essentials.
            </p>
          </div>

          <div style={styles.grid}>
            {[...Array(8)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <section style={styles.hero}>
          <div>
            <p style={styles.heroLabel}>Explore Collection</p>
            <h1 style={styles.heading}>All Products</h1>
            <p style={styles.heroText}>
              Browse our curated collection of premium tech products with smart
              filters and fast navigation.
            </p>
          </div>

          <div style={styles.statsBox}>
            <span style={styles.statsNumber}>{filteredProducts.length}</span>
            <span style={styles.statsLabel}>Products Found</span>
          </div>
        </section>

        <div style={styles.controlsCard}>
          <div style={styles.controls}>
            <input
              type="text"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.input}
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={styles.select}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              style={styles.select}
            >
              <option value="default">Default</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>

          <p style={styles.resultCount}>
            Showing <strong>{filteredProducts.length}</strong> product(s)
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div style={styles.grid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🔍</div>
            <h2 style={styles.emptyTitle}>No products found</h2>
            <p style={styles.emptyText}>
              Try changing the search term, category, or sorting option.
            </p>
          </div>
        )}
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
  hero: {
    marginBottom: "28px",
    padding: "32px",
    borderRadius: theme.radius.lg,
    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primarySoft} 65%, ${theme.colors.accentSoft} 140%)`,
    color: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    boxShadow: theme.shadow.lg,
  },
  heroLabel: {
    margin: "0 0 10px",
    color: "#cbd5e1",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },
  heading: {
    marginBottom: "20px",
  color: "#fff",
  },
  heroText: {
    margin: 0,
    color: "#dbe4f0",
    fontSize: "16px",
    lineHeight: "1.8",
    maxWidth: "700px",
  },
  statsBox: {
    minWidth: "180px",
    padding: "22px",
    borderRadius: "22px",
    backgroundColor: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.14)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(8px)",
  },
  statsNumber: {
    fontSize: "34px",
    fontWeight: "800",
    lineHeight: 1,
  },
  statsLabel: {
    marginTop: "8px",
    color: "#dbe4f0",
    fontSize: "14px",
    fontWeight: "600",
  },
  controlsCard: {
    marginBottom: "26px",
    padding: "22px",
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
  },
  controls: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    minWidth: "260px",
    padding: "14px 16px",
    borderRadius: "14px",
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.surfaceSoft,
    fontSize: "15px",
    color: theme.colors.text,
    outline: "none",
  },
  select: {
    minWidth: "220px",
    padding: "14px 16px",
    borderRadius: "14px",
    border: `1px solid ${theme.colors.border}`,
    backgroundColor: theme.colors.surfaceSoft,
    fontSize: "15px",
    color: theme.colors.text,
    outline: "none",
  },
  resultCount: {
    margin: 0,
    color: theme.colors.textMuted,
    fontSize: "15px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "22px",
  },
  emptyState: {
    width: "100%",
    textAlign: "center",
    padding: "70px 20px",
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surface,
    border: `1px dashed ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
  },
  emptyIcon: {
    fontSize: "46px",
    marginBottom: "12px",
  },
  emptyTitle: {
    margin: "0 0 10px",
    fontSize: "28px",
    color: theme.colors.text,
  },
  emptyText: {
    margin: 0,
    color: theme.colors.textMuted,
    fontSize: "15px",
  },
};

export default Products;