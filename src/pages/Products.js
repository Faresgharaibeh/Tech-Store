import { useEffect, useMemo, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";
import SkeletonCard from "../components/SkeletonCard";
import { theme } from "../styles/theme";
import categories from "../data/categories";

const normalizeCategory = (value) => {
  const clean = String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/-/g, "")
    .replace(/_/g, "");

  const aliases = {
    phone: "phones",
    phones: "phones",
    mobile: "phones",
    mobiles: "phones",
    smartphone: "phones",
    smartphones: "phones",

    headphone: "headphones",
    headphones: "headphones",
    headset: "headphones",
    headsets: "headphones",
    earphone: "headphones",
    earphones: "headphones",
    earbuds: "headphones",

    case: "cases",
    cases: "cases",
    cover: "cases",
    covers: "cases",
    phonecase: "cases",
    phonecases: "cases",

    charger: "chargers",
    chargers: "chargers",
    adapter: "chargers",
    adapters: "chargers",

    laptop: "laptops",
    laptops: "laptops",

    computer: "computers",
    computers: "computers",
    pc: "computers",
    pcs: "computers",

    mouse: "mouse",
    mice: "mouse",

    keyboard: "keyboard",
    keyboards: "keyboard",

    mousepad: "mousepads",
    mousepads: "mousepads",
    mousemat: "mousepads",
    mousemats: "mousepads",

    ethernetcable: "ethernetcables",
    ethernetcables: "ethernetcables",
    lancable: "ethernetcables",
    lancables: "ethernetcables",
    networkcable: "ethernetcables",
    networkcables: "ethernetcables",

    router: "routers",
    routers: "routers",

    powerbank: "powerbanks",
    powerbanks: "powerbanks",
  };

  return aliases[clean] || clean;
};

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");

    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categoryOptions = useMemo(() => {
    const fromProducts = [...new Set(products.map((item) => item.category))]
      .filter(Boolean)
      .sort();

    const fromFile = categories || [];

    return ["All", ...new Set([...fromFile, ...fromProducts])];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter(
        (product) =>
          normalizeCategory(product.category) ===
          normalizeCategory(selectedCategory)
      );
    }

    if (search.trim()) {
      const cleanSearch = search.toLowerCase();

      result = result.filter((product) => {
        return (
          product.name?.toLowerCase().includes(cleanSearch) ||
          product.brand?.toLowerCase().includes(cleanSearch) ||
          product.category?.toLowerCase().includes(cleanSearch)
        );
      });
    }

    if (maxPrice) {
      result = result.filter(
        (product) => Number(product.price || 0) <= Number(maxPrice)
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }

    if (sortBy === "name") {
      result.sort((a, b) => String(a.name).localeCompare(String(b.name)));
    }

    if (sortBy === "stock") {
      result.sort((a, b) => Number(b.stock || 0) - Number(a.stock || 0));
    }

    return result;
  }, [products, selectedCategory, search, sortBy, maxPrice]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortBy("featured");
    setMaxPrice("");
  };

  return (
    <main className="page-wrap">
      <div className="container-xl">
        <section style={styles.header} className="fade-up">
          <div>
            <span style={styles.kicker}>Shop Collection</span>
            <h1 style={styles.title}>Find your perfect tech accessories</h1>
            <p style={styles.subtitle}>
              Search, filter and sort through all available products with a
              smoother modern shopping experience.
            </p>
          </div>

          <div style={styles.headerPill}>
            <strong>{filteredProducts.length}</strong>
            <span>Products found</span>
          </div>
        </section>

        <section className="responsive-grid-2" style={styles.layout}>
          <aside style={styles.sidebar} className="sticky-card fade-up">
            <div style={styles.filterHeader}>
              <h2 style={styles.filterTitle}>Filters</h2>
              <button onClick={clearFilters} style={styles.clearBtn}>
                Clear
              </button>
            </div>

            <label style={styles.label}>Search</label>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
              style={styles.input}
            />

            <label style={styles.label}>Category</label>
            <div style={styles.categoryList}>
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    ...styles.categoryBtn,
                    background:
                      selectedCategory === category
                        ? theme.gradients.primary
                        : "#fff",
                    color:
                      selectedCategory === category
                        ? "#fff"
                        : theme.colors.text,
                    borderColor:
                      selectedCategory === category
                        ? "transparent"
                        : theme.colors.border,
                  }}
                >
                  {category}
                </button>
              ))}
            </div>

            <label style={styles.label}>Max Price</label>
            <input
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Example: 120"
              type="number"
              min="0"
              style={styles.input}
            />

            <label style={styles.label}>Sort By</label>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              style={styles.input}
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name</option>
              <option value="stock">Stock</option>
            </select>
          </aside>

          <div style={styles.content}>
            <div style={styles.toolbar} className="fade-up">
              <div>
                <p style={styles.toolbarLabel}>Showing results for</p>
                <h3 style={styles.toolbarTitle}>
                  {selectedCategory === "All"
                    ? "All Products"
                    : selectedCategory}
                </h3>
              </div>

              <div style={styles.viewToggle}>
                <button
                  onClick={() => setViewMode("grid")}
                  style={{
                    ...styles.viewBtn,
                    background:
                      viewMode === "grid" ? theme.colors.primary : "#fff",
                    color: viewMode === "grid" ? "#fff" : theme.colors.text,
                  }}
                >
                  Grid
                </button>

                <button
                  onClick={() => setViewMode("list")}
                  style={{
                    ...styles.viewBtn,
                    background:
                      viewMode === "list" ? theme.colors.primary : "#fff",
                    color: viewMode === "list" ? "#fff" : theme.colors.text,
                  }}
                >
                  List
                </button>
              </div>
            </div>

            {loading ? (
              <div style={styles.grid} className="product-grid">
                {[...Array(8)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div
                style={{
                  ...styles.grid,
                  ...(viewMode === "list" ? styles.listMode : {}),
                }}
                className="product-grid"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div style={styles.emptyState} className="fade-up">
                <div style={styles.emptyIcon}>🔎</div>
                <h2>No products found</h2>
                <p>
                  Try changing your search, category, price limit or sorting
                  options.
                </p>
                <button onClick={clearFilters} style={styles.emptyBtn}>
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

const styles = {
  header: {
    marginBottom: "24px",
    padding: "34px",
    borderRadius: theme.radius.xl,
    background: "linear-gradient(135deg, #FFFFFF, #EEF2FF)",
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
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
    fontSize: "42px",
    lineHeight: 1.1,
    letterSpacing: "-1px",
    fontWeight: 950,
  },

  subtitle: {
    margin: 0,
    maxWidth: "720px",
    color: theme.colors.textMuted,
    lineHeight: 1.7,
    fontWeight: 600,
  },

  headerPill: {
    minWidth: "160px",
    padding: "18px",
    borderRadius: "24px",
    background: theme.gradients.primary,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    textAlign: "center",
    boxShadow: "0 18px 40px rgba(59,130,246,.25)",
  },

  layout: {
    display: "grid",
    gridTemplateColumns: "290px 1fr",
    gap: "24px",
    alignItems: "start",
  },

  sidebar: {
    position: "sticky",
    top: "96px",
    padding: "22px",
    borderRadius: theme.radius.lg,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
  },

  filterHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  filterTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 950,
  },

  clearBtn: {
    border: "none",
    borderRadius: "12px",
    padding: "8px 12px",
    background: "rgba(239,68,68,.10)",
    color: theme.colors.danger,
    fontWeight: 900,
    cursor: "pointer",
  },

  label: {
    display: "block",
    margin: "18px 0 8px",
    color: theme.colors.text,
    fontWeight: 900,
    fontSize: "14px",
  },

  input: {
    width: "100%",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "15px",
    padding: "13px 14px",
    outline: "none",
    background: "#fff",
  },

  categoryList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  categoryBtn: {
    textAlign: "left",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "14px",
    padding: "11px 13px",
    fontWeight: 850,
    cursor: "pointer",
  },

  content: {
    minWidth: 0,
  },

  toolbar: {
    marginBottom: "18px",
    padding: "18px",
    borderRadius: theme.radius.lg,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },

  toolbarLabel: {
    margin: "0 0 5px",
    color: theme.colors.textMuted,
    fontSize: "13px",
    fontWeight: 800,
  },

  toolbarTitle: {
    margin: 0,
    fontSize: "22px",
    fontWeight: 950,
  },

  viewToggle: {
    display: "flex",
    padding: "5px",
    borderRadius: "16px",
    background: theme.colors.surfaceSoft,
    gap: "6px",
  },

  viewBtn: {
    border: "none",
    borderRadius: "12px",
    padding: "9px 13px",
    fontWeight: 900,
    cursor: "pointer",
  },

  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "22px",
  },

  listMode: {
    flexDirection: "column",
  },

  emptyState: {
    padding: "70px 26px",
    borderRadius: theme.radius.xl,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    textAlign: "center",
  },

  emptyIcon: {
    width: "76px",
    height: "76px",
    margin: "0 auto 16px",
    display: "grid",
    placeItems: "center",
    borderRadius: "26px",
    background: "linear-gradient(145deg, #EEF2FF, #FFFFFF)",
    fontSize: "34px",
  },

  emptyBtn: {
    marginTop: "12px",
    border: "none",
    borderRadius: "16px",
    padding: "13px 20px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
  },
};

export default Products;