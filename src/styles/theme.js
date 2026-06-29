export const theme = {
  colors: {
    primary: "#0B1020",
    primarySoft: "#111827",
    accent: "#3B82F6",
    accentSoft: "#8B5CF6",
    accentWarm: "#F97316",
    background: "#F6F8FC",
    surface: "#FFFFFF",
    surfaceSoft: "#F1F5F9",
    border: "#E5E7EB",
    text: "#111827",
    textMuted: "#64748B",
    success: "#10B981",
    danger: "#EF4444",
    warning: "#F59E0B",
  },

  gradients: {
    hero: "linear-gradient(135deg, #0B1020 0%, #172554 48%, #7C3AED 115%)",
    primary: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
    warm: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
    glass:
      "linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.06))",
    page:
      "radial-gradient(circle at top left, rgba(59,130,246,0.12), transparent 28%), radial-gradient(circle at top right, rgba(139,92,246,0.12), transparent 30%), #F6F8FC",
  },

  shadow: {
    sm: "0 8px 20px rgba(15, 23, 42, 0.06)",
    md: "0 18px 45px rgba(15, 23, 42, 0.10)",
    lg: "0 28px 70px rgba(15, 23, 42, 0.16)",
  },

  radius: {
    sm: "12px",
    md: "18px",
    lg: "28px",
    xl: "36px",
    full: "999px",
  },

  transition: "all 0.25s ease",
};

export const getTheme = () => theme;