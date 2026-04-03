function StarRating({ rating = 0, onRate, size = "24px" }) {
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onRate && onRate(star)}
          style={{
            cursor: onRate ? "pointer" : "default",
            fontSize: size,
            color: star <= rating ? "#f5b301" : "#ccc",
            userSelect: "none",
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default StarRating;