function SkeletonCard() {
  return (
    <div style={styles.card}>
      <div style={styles.shimmer}></div>
      <div style={styles.image}></div>
      <div style={styles.lineLarge}></div>
      <div style={styles.lineMedium}></div>
      <div style={styles.lineSmall}></div>
      <div style={styles.button}></div>
    </div>
  );
}

const styles = {
  card: {
    width: "270px",
    padding: "16px",
    borderRadius: "18px",
    backgroundColor: "#fff",
    position: "relative",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
  },
  shimmer: {
    position: "absolute",
    top: 0,
    left: "-150%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
    animation: "shimmer 1.4s infinite",
  },
  image: {
    height: "230px",
    borderRadius: "16px",
    backgroundColor: "#eef2f7",
    marginBottom: "18px",
  },
  lineLarge: {
    height: "18px",
    borderRadius: "10px",
    backgroundColor: "#eef2f7",
    marginBottom: "10px",
    width: "85%",
  },
  lineMedium: {
    height: "14px",
    borderRadius: "10px",
    backgroundColor: "#eef2f7",
    marginBottom: "10px",
    width: "60%",
  },
  lineSmall: {
    height: "14px",
    borderRadius: "10px",
    backgroundColor: "#eef2f7",
    marginBottom: "18px",
    width: "40%",
  },
  button: {
    height: "44px",
    borderRadius: "14px",
    backgroundColor: "#eef2f7",
  },
};

export default SkeletonCard;