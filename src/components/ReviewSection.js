import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { addReview, getReviewsByProductId } from "../services/reviewService";
import { toast } from "react-toastify";
import { theme } from "../styles/theme";

function ReviewSection({ productId }) {
  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = useCallback(async () => {
    if (!productId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getReviewsByProductId(productId);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );

    return total / reviews.length;
  }, [reviews]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Please login to add a review");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write your review");
      return;
    }

    try {
      setSubmitting(true);

      await addReview({
        productId,
        userId: user.uid,
        userEmail: user.email,
        rating: Number(rating),
        comment: comment.trim(),
      });

      setComment("");
      setRating(5);
      toast.success("Review added successfully");

      await fetchReviews();
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section style={styles.container}>
      <div style={styles.summary}>
        <div style={styles.scoreBox}>
          <strong style={styles.score}>
            {averageRating ? averageRating.toFixed(1) : "0.0"}
          </strong>

          <span style={styles.stars}>
            {"★".repeat(Math.round(averageRating || 0))}
            {"☆".repeat(5 - Math.round(averageRating || 0))}
          </span>

          <p style={styles.scoreText}>{reviews.length} reviews</p>
        </div>

        <div style={styles.summaryText}>
          <h2 style={styles.heading}>Customer Reviews</h2>
          <p style={styles.paragraph}>
            See what other customers think about this product, and share your
            own experience after trying it.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formHeader}>
          <h3 style={styles.formTitle}>Write a review</h3>

          <select
            value={rating}
            onChange={(event) => setRating(event.target.value)}
            style={styles.select}
          >
            <option value="5">★★★★★ 5</option>
            <option value="4">★★★★☆ 4</option>
            <option value="3">★★★☆☆ 3</option>
            <option value="2">★★☆☆☆ 2</option>
            <option value="1">★☆☆☆☆ 1</option>
          </select>
        </div>

        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Share your thoughts about this product..."
          style={styles.textarea}
        />

        <button type="submit" disabled={submitting} style={styles.submitBtn}>
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      <div style={styles.list}>
        {loading ? (
          <p style={styles.muted}>Loading reviews...</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <article key={review.id} style={styles.reviewCard}>
              <div style={styles.reviewTop}>
                <div>
                  <strong style={styles.email}>
                    {review.userEmail || "Customer"}
                  </strong>

                  <div style={styles.reviewStars}>
                    {"★".repeat(Number(review.rating || 0))}
                    {"☆".repeat(5 - Number(review.rating || 0))}
                  </div>
                </div>

                <span style={styles.verified}>Verified</span>
              </div>

              <p style={styles.comment}>{review.comment}</p>
            </article>
          ))
        ) : (
          <div style={styles.noReviews}>
            <div style={styles.noReviewsIcon}>💬</div>
            <h3>No reviews yet</h3>
            <p>Be the first customer to review this product.</p>
          </div>
        )}
      </div>
    </section>
  );
}

const styles = {
  container: {
    width: "100%",
  },

  summary: {
    display: "grid",
    gridTemplateColumns: "170px 1fr",
    gap: "18px",
    marginBottom: "22px",
  },

  scoreBox: {
    padding: "22px",
    borderRadius: theme.radius.lg,
    background: "linear-gradient(145deg, #EEF2FF, #FFFFFF)",
    border: `1px solid ${theme.colors.border}`,
    textAlign: "center",
  },

  score: {
    display: "block",
    fontSize: "42px",
    lineHeight: 1,
    color: theme.colors.text,
    fontWeight: 950,
  },

  stars: {
    display: "block",
    color: theme.colors.warning,
    marginTop: "10px",
    letterSpacing: "1px",
  },

  scoreText: {
    margin: "8px 0 0",
    color: theme.colors.textMuted,
    fontWeight: 800,
  },

  summaryText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  heading: {
    margin: 0,
    fontSize: "28px",
    fontWeight: 950,
    color: theme.colors.text,
  },

  paragraph: {
    margin: "8px 0 0",
    color: theme.colors.textMuted,
    lineHeight: 1.7,
  },

  form: {
    padding: "18px",
    borderRadius: theme.radius.lg,
    background: theme.colors.surfaceSoft,
    border: `1px solid ${theme.colors.border}`,
    marginBottom: "20px",
  },

  formHeader: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "12px",
  },

  formTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 950,
    color: theme.colors.text,
  },

  select: {
    padding: "11px 13px",
    borderRadius: "14px",
    border: `1px solid ${theme.colors.border}`,
    background: "#fff",
    outline: "none",
    fontWeight: 800,
  },

  textarea: {
    width: "100%",
    minHeight: "110px",
    resize: "vertical",
    border: `1px solid ${theme.colors.border}`,
    borderRadius: "16px",
    padding: "14px",
    outline: "none",
  },

  submitBtn: {
    marginTop: "12px",
    border: "none",
    borderRadius: "16px",
    padding: "13px 18px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 950,
    cursor: "pointer",
  },

  list: {
    display: "grid",
    gap: "12px",
  },

  reviewCard: {
    padding: "18px",
    borderRadius: theme.radius.lg,
    background: "#fff",
    border: `1px solid ${theme.colors.border}`,
  },

  reviewTop: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "start",
  },

  email: {
    color: theme.colors.text,
    fontWeight: 950,
  },

  reviewStars: {
    marginTop: "6px",
    color: theme.colors.warning,
    letterSpacing: "1px",
  },

  verified: {
    padding: "7px 10px",
    borderRadius: theme.radius.full,
    background: "rgba(16,185,129,.10)",
    color: theme.colors.success,
    fontSize: "12px",
    fontWeight: 950,
  },

  comment: {
    margin: "14px 0 0",
    color: theme.colors.textMuted,
    lineHeight: 1.7,
  },

  muted: {
    color: theme.colors.textMuted,
    fontWeight: 800,
  },

  noReviews: {
    textAlign: "center",
    padding: "36px 20px",
    borderRadius: theme.radius.lg,
    background: "#fff",
    border: `1px solid ${theme.colors.border}`,
  },

  noReviewsIcon: {
    fontSize: "38px",
    marginBottom: "10px",
  },
};

export default ReviewSection;