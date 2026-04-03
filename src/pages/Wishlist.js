import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h1>Your Wishlist is Empty</h1>
        <Link to="/products" style={styles.shopBtn}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>My Wishlist ❤️</h1>

      <div style={styles.grid}>
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
  },
  heading: {
    marginBottom: "20px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
  },
  emptyContainer: {
    padding: "40px",
    textAlign: "center",
  },
  shopBtn: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 18px",
    backgroundColor: "#111",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "8px",
  },
};

export default Wishlist;