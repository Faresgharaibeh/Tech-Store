import { theme } from "../styles/theme";

function SkeletonCard() {
  return (
    <div style={styles.card} className="shimmer product-card">
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
    width: "276px",
    padding: "14px",
    borderRadius: theme.radius.lg,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    overflow: "hidden",
  },

  image: {
    height: "230px",
    borderRadius: "22px",
    background: "#EEF2F7",
    marginBottom: "18px",
  },

  lineLarge: {
    height: "18px",
    borderRadius: "10px",
    background: "#EEF2F7",
    marginBottom: "10px",
    width: "85%",
  },

  lineMedium: {
    height: "14px",
    borderRadius: "10px",
    background: "#EEF2F7",
    marginBottom: "10px",
    width: "60%",
  },

  lineSmall: {
    height: "14px",
    borderRadius: "10px",
    background: "#EEF2F7",
    marginBottom: "18px",
    width: "40%",
  },

  button: {
    height: "45px",
    borderRadius: "18px",
    background: "#EEF2F7",
  },
};

export default SkeletonCard;