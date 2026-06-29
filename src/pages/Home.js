import { Link } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import { theme } from "../styles/theme";

function Home() {
  const stats = [
    { number: "500+", label: "Premium Products" },
    { number: "10K+", label: "Happy Customers" },
    { number: "24/7", label: "Fast Support" },
  ];

  const features = [
    {
      icon: "🚚",
      title: "Fast Delivery",
      description: "Quick shipping for all tech accessories and gaming gear.",
    },
    {
      icon: "🛡️",
      title: "Secure Shopping",
      description: "Safe checkout experience with protected user accounts.",
    },
    {
      icon: "🔥",
      title: "Hot Deals",
      description: "Modern gadgets, keyboards, mice, headsets and more.",
    },
  ];

  return (
    <main className="page-wrap">
      <div className="container-xl">
        <section style={styles.hero} className="fade-up">
          <div style={styles.heroContent}>
            <span style={styles.kicker}>Modern Tech Store</span>

            <h1 className="hero-title" style={styles.heroTitle}>
              Upgrade your setup with premium tech gear.
            </h1>

            <p style={styles.heroText}>
              Discover keyboards, mice, headsets, mouse pads and accessories
              designed to make your workspace and gaming setup feel faster,
              cleaner and more powerful.
            </p>

            <div style={styles.heroActions}>
              <Link to="/products" style={styles.primaryBtn}>
                Shop Now
              </Link>

              <a href="#featured" style={styles.secondaryBtn}>
                Explore Categories
              </a>
            </div>

            <div style={styles.stats}>
              {stats.map((item) => (
                <div key={item.label} style={styles.statItem}>
                  <strong>{item.number}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.heroVisual}>
            <div style={styles.glowOne}></div>
            <div style={styles.glowTwo}></div>

            <div style={styles.visualCardLarge} className="float-soft">
              <span style={styles.visualBadge}>Best Seller</span>
              <div style={styles.deviceShape}>⌨️</div>
              <h3 style={styles.visualTitle}>Gaming Keyboard</h3>
              <p style={styles.visualText}>RGB mechanical performance</p>
            </div>

            <div style={styles.visualCardSmallTop} className="pulse-soft">
              <span>🎧</span>
              <div>
                <strong>Headsets</strong>
                <p>Crystal sound</p>
              </div>
            </div>

            <div style={styles.visualCardSmallBottom}>
              <span>🖱️</span>
              <div>
                <strong>Gaming Mice</strong>
                <p>Precision control</p>
              </div>
            </div>
          </div>
        </section>

        <section style={styles.features}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              style={{
                ...styles.featureCard,
                animationDelay: `${index * 0.12}s`,
              }}
              className="fade-up"
            >
              <div style={styles.featureIcon}>{feature.icon}</div>
              <h3 style={styles.featureTitle}>{feature.title}</h3>
              <p style={styles.featureText}>{feature.description}</p>
            </div>
          ))}
        </section>

        <section id="featured" style={styles.dealBanner} className="fade-up">
          <div>
            <p style={styles.dealLabel}>Limited Offer</p>
            <h2 style={styles.dealTitle}>Build your dream setup today</h2>
            <p style={styles.dealText}>
              Mix and match your favorite accessories and enjoy a cleaner,
              faster and more stylish tech experience.
            </p>
          </div>

          <Link to="/products" style={styles.dealBtn}>
            View Deals →
          </Link>
        </section>

        <CategorySection title="Gaming Keyboards" category="Keyboard" />
        <CategorySection title="Gaming Mice" category="Mouse" />
        <CategorySection title="Headsets" category="Headset" />
        <CategorySection title="Mouse Pads" category="Mouse Pads" />
      </div>
    </main>
  );
}

const styles = {
  hero: {
    minHeight: "560px",
    borderRadius: theme.radius.xl,
    background: theme.gradients.hero,
    padding: "58px",
    display: "grid",
    gridTemplateColumns: "1.05fr .95fr",
    gap: "40px",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: theme.shadow.lg,
  },

  heroContent: {
    position: "relative",
    zIndex: 2,
  },

  kicker: {
    display: "inline-flex",
    padding: "9px 14px",
    borderRadius: theme.radius.full,
    background: "rgba(255,255,255,0.12)",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "#DBEAFE",
    fontWeight: 900,
    fontSize: "13px",
    marginBottom: "18px",
  },

  heroTitle: {
    margin: 0,
    maxWidth: "720px",
    color: "#fff",
    fontSize: "64px",
    lineHeight: 1.03,
    letterSpacing: "-2.4px",
    fontWeight: 950,
  },

  heroText: {
    maxWidth: "620px",
    margin: "22px 0 0",
    color: "#CBD5E1",
    fontSize: "18px",
    lineHeight: 1.75,
    fontWeight: 500,
  },

  heroActions: {
    display: "flex",
    gap: "14px",
    marginTop: "30px",
    flexWrap: "wrap",
  },

  primaryBtn: {
    textDecoration: "none",
    borderRadius: "18px",
    padding: "15px 24px",
    background: theme.gradients.primary,
    color: "#fff",
    fontWeight: 950,
    boxShadow: "0 18px 38px rgba(59,130,246,.34)",
  },

  secondaryBtn: {
    textDecoration: "none",
    borderRadius: "18px",
    padding: "15px 24px",
    background: "rgba(255,255,255,.12)",
    border: "1px solid rgba(255,255,255,.18)",
    color: "#fff",
    fontWeight: 900,
  },

  stats: {
    display: "flex",
    gap: "16px",
    marginTop: "34px",
    flexWrap: "wrap",
  },

  statItem: {
    minWidth: "150px",
    padding: "16px",
    borderRadius: "20px",
    background: "rgba(255,255,255,.10)",
    border: "1px solid rgba(255,255,255,.14)",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  heroVisual: {
    position: "relative",
    minHeight: "460px",
  },

  glowOne: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(59,130,246,.34)",
    filter: "blur(44px)",
    top: "34px",
    right: "60px",
  },

  glowTwo: {
    position: "absolute",
    width: "260px",
    height: "260px",
    borderRadius: "50%",
    background: "rgba(139,92,246,.34)",
    filter: "blur(46px)",
    bottom: "40px",
    left: "30px",
  },

  visualCardLarge: {
    position: "absolute",
    inset: "60px 70px 50px 60px",
    borderRadius: "34px",
    background:
      "linear-gradient(145deg, rgba(255,255,255,.92), rgba(255,255,255,.72))",
    border: "1px solid rgba(255,255,255,.74)",
    backdropFilter: "blur(18px)",
    boxShadow: "0 35px 80px rgba(0,0,0,.22)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "28px",
  },

  visualBadge: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "9px 12px",
    borderRadius: theme.radius.full,
    background: "rgba(59,130,246,.12)",
    color: theme.colors.accent,
    fontWeight: 950,
    fontSize: "12px",
  },

  deviceShape: {
    width: "170px",
    height: "170px",
    borderRadius: "42px",
    background: "linear-gradient(145deg, #EEF2FF, #FFFFFF)",
    display: "grid",
    placeItems: "center",
    fontSize: "80px",
    boxShadow: theme.shadow.md,
  },

  visualTitle: {
    margin: "24px 0 6px",
    fontSize: "28px",
    fontWeight: 950,
  },

  visualText: {
    margin: 0,
    color: theme.colors.textMuted,
    fontWeight: 700,
  },

  visualCardSmallTop: {
    position: "absolute",
    top: "18px",
    right: "10px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "16px",
    borderRadius: "22px",
    background: "rgba(255,255,255,.88)",
    boxShadow: theme.shadow.md,
  },

  visualCardSmallBottom: {
    position: "absolute",
    bottom: "10px",
    left: "0px",
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "16px",
    borderRadius: "22px",
    background: "rgba(255,255,255,.88)",
    boxShadow: theme.shadow.md,
  },

  features: {
    marginTop: "26px",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
  },

  featureCard: {
    padding: "24px",
    borderRadius: theme.radius.lg,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
  },

  featureIcon: {
    width: "54px",
    height: "54px",
    borderRadius: "18px",
    display: "grid",
    placeItems: "center",
    fontSize: "25px",
    background: "linear-gradient(145deg, #EEF2FF, #FFFFFF)",
  },

  featureTitle: {
    margin: "18px 0 8px",
    fontSize: "20px",
    fontWeight: 950,
  },

  featureText: {
    margin: 0,
    color: theme.colors.textMuted,
    lineHeight: 1.65,
    fontWeight: 600,
  },

  dealBanner: {
    marginTop: "28px",
    padding: "28px",
    borderRadius: theme.radius.lg,
    background: "linear-gradient(135deg, #FFFFFF, #EEF2FF)",
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "18px",
    flexWrap: "wrap",
  },

  dealLabel: {
    margin: "0 0 8px",
    color: theme.colors.accentSoft,
    fontWeight: 950,
    textTransform: "uppercase",
    fontSize: "13px",
  },

  dealTitle: {
    margin: 0,
    fontSize: "30px",
    fontWeight: 950,
  },

  dealText: {
    margin: "8px 0 0",
    color: theme.colors.textMuted,
    lineHeight: 1.65,
    maxWidth: "650px",
  },

  dealBtn: {
    textDecoration: "none",
    padding: "14px 20px",
    borderRadius: "16px",
    background: theme.colors.primary,
    color: "#fff",
    fontWeight: 900,
  },
};

export default Home;