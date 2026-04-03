import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { addReview, getReviewsByProductId } from "../services/reviewService";
import StarRating from "./StarRating";

function ReviewSection({ productId }) {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviewsByProductId(productId);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce((sum, item) => sum + item.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must login first");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setSubmitting(true);

      await addReview({
        productId,
        userId: user.uid,
        userEmail: user.email,
        rating,
        comment: comment.trim(),
      });

      toast.success("Review added successfully ⭐");

      setRating(0);
      setComment("");
      fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={{ marginBottom: "10px" }}>Reviews & Ratings</h2>

        <div style={styles.summaryBox}>
          <h3 style={{ margin: 0 }}>{averageRating} / 5</h3>
          <StarRating rating={Math.round(Number(averageRating))} size="22px" />
          <p style={{ margin: "8px 0 0", color: "#666" }}>
            {reviews.length} review(s)
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h3>Add Your Review</h3>

        <StarRating rating={rating} onRate={setRating} />

        <textarea
          placeholder="Write your review here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={styles.textarea}
        />

        <button type="submit" style={styles.button} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      <div style={styles.list}>
        {loading ? (
          <p>Loading reviews...</p>
        ) : reviews.length === 0 ? (
          <div style={styles.emptyBox}>
            <h4 style={{ marginBottom: "8px" }}>No reviews yet</h4>
            <p style={{ margin: 0, color: "#666" }}>
              Be the first one to review this product.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} style={styles.card}>
              <div style={styles.cardTop}>
                <div>
                  <p style={styles.email}>{review.userEmail}</p>
                  <StarRating rating={review.rating} size="18px" />
                </div>
              </div>

              <p style={styles.comment}>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "50px",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: "25px",
  },
  summaryBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px",
    backgroundColor: "#fafafa",
    borderRadius: "10px",
    border: "1px solid #eee",
    maxWidth: "220px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "30px",
  },
  textarea: {
    minHeight: "110px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    resize: "vertical",
    fontSize: "15px",
  },
  button: {
    width: "fit-content",
    padding: "12px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#111",
    color: "#fff",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  card: {
    border: "1px solid #e5e5e5",
    borderRadius: "10px",
    padding: "16px",
    backgroundColor: "#fafafa",
  },
  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  email: {
    margin: "0 0 8px",
    fontWeight: "bold",
  },
  comment: {
    margin: 0,
    lineHeight: "1.6",
    color: "#333",
  },
  emptyBox: {
    padding: "20px",
    border: "1px dashed #ccc",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#fafafa",
  },
};

export default ReviewSection;