export const getTheme = (darkMode = false) => ({
  colors: {
    primary: darkMode ? "#E5E7EB" : "#0B0F19",
    primarySoft: darkMode ? "#CBD5E1" : "#111827",
    accent: "#3B82F6",
    accentSoft: "#8B5CF6",
    background: darkMode ? "#0F172A" : "#F8FAFC",
    surface: darkMode ? "#111827" : "#FFFFFF",
    surfaceSoft: darkMode ? "#1E293B" : "#F3F6FB",
    border: darkMode ? "#334155" : "#E5E7EB",
    text: darkMode ? "#F8FAFC" : "#111827",
    textMuted: darkMode ? "#94A3B8" : "#6B7280",
    success: "#10B981",
    danger: "#EF4444",
    warning: "#F59E0B",
  },
  shadow: {
    sm: darkMode
      ? "0 4px 10px rgba(0,0,0,0.35)"
      : "0 4px 10px rgba(15, 23, 42, 0.05)",
    md: darkMode
      ? "0 10px 30px rgba(0,0,0,0.45)"
      : "0 10px 30px rgba(15, 23, 42, 0.08)",
    lg: darkMode
      ? "0 20px 40px rgba(0,0,0,0.5)"
      : "0 20px 40px rgba(15, 23, 42, 0.12)",
  },
  radius: {
    sm: "10px",
    md: "18px",
    lg: "28px",
  },
  transition: "all 0.25s ease",
});
export const theme = getTheme(false);