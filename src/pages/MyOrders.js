import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrdersByUserId } from "../services/orderService";
import { theme } from "../styles/theme";

function MyOrders() {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.uid) return;

      try {
        setLoading(true);
        const data = await getOrdersByUserId(user.uid);
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <main className="page-wrap">
      <div className="container-xl">
        <section style={styles.header} className="fade-up">
          <div>
            <span style={styles.kicker}>Orders</span>
            <h1 style={styles.title}>My Orders</h1>
            <p style={styles.subtitle}>
              Track your previous purchases and review order details.
            </p>
          </div>
        </section>

        {loading ? (
          <div style={styles.loadingCard} className="shimmer">
            Loading your orders...
          </div>
        ) : orders.length > 0 ? (
          <section style={styles.ordersList}>
            {orders.map((order) => (
              <article key={order.id} style={styles.orderCard} className="fade-up">
                <div style={styles.orderTop}>
                  <div>
                    <p style={styles.orderLabel}>Order ID</p>
                    <h3 style={styles.orderId}>{order.id}</h3>
                  </div>

                  <span style={styles.status}>
                    {order.status || order.payment?.status || "Processing"}
                  </span>
                </div>

                <div style={styles.orderMeta}>
                  <div style={styles.metaBox}>
                    <span>Total</span>
                    <strong>
                      ${Number(order.totalPrice || 0).toFixed(2)}
                    </strong>
                  </div>

                  <div style={styles.metaBox}>
                    <span>Payment</span>
                    <strong>
                      {order.payment?.method || order.paymentMethod || "N/A"}
                    </strong>
                  </div>

                  <div style={styles.metaBox}>
                    <span>Items</span>
                    <strong>{order.items?.length || 0}</strong>
                  </div>
                </div>

                <div style={styles.itemsBox}>
                  <h4 style={styles.itemsTitle}>Products</h4>

                  {(order.items || []).map((item) => (
                    <div key={`${order.id}-${item.id}`} style={styles.itemRow}>
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <strong>
                        ${(Number(item.price || 0) * item.quantity).toFixed(2)}
                      </strong>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>
        ) : (
          <section style={styles.emptyState} className="fade-up">
            <div style={styles.emptyIcon}>📦</div>
            <h2 style={styles.emptyTitle}>No orders yet</h2>
            <p style={styles.emptyText}>
              Your orders will appear here after you complete checkout.
            </p>
          </section>
        )}
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
    fontWeight: 950,
    letterSpacing: "-1px",
  },

  subtitle: {
    margin: 0,
    color: theme.colors.textMuted,
    lineHeight: 1.7,
    fontWeight: 600,
  },

  ordersList: {
    display: "grid",
    gap: "18px",
  },

  orderCard: {
    padding: "24px",
    borderRadius: theme.radius.xl,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
  },

  orderTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    gap: "18px",
    flexWrap: "wrap",
    marginBottom: "18px",
  },

  orderLabel: {
    margin: "0 0 6px",
    color: theme.colors.textMuted,
    fontSize: "13px",
    fontWeight: 850,
  },

  orderId: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 950,
    wordBreak: "break-word",
  },

  status: {
    padding: "9px 13px",
    borderRadius: theme.radius.full,
    background: "rgba(59,130,246,.10)",
    color: theme.colors.accent,
    fontWeight: 950,
    fontSize: "13px",
  },

  orderMeta: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "12px",
    marginBottom: "18px",
  },

  metaBox: {
    padding: "16px",
    borderRadius: "18px",
    background: theme.colors.surfaceSoft,
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    color: theme.colors.textMuted,
    fontWeight: 800,
  },

  itemsBox: {
    padding: "16px",
    borderRadius: "18px",
    background: "#fff",
    border: `1px solid ${theme.colors.border}`,
  },

  itemsTitle: {
    margin: "0 0 12px",
    fontSize: "18px",
    fontWeight: 950,
  },

  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    padding: "10px 0",
    borderTop: `1px solid ${theme.colors.border}`,
    color: theme.colors.textMuted,
    fontWeight: 750,
  },

  loadingCard: {
    padding: "70px",
    borderRadius: theme.radius.xl,
    background: theme.colors.surface,
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    textAlign: "center",
    fontWeight: 950,
  },

  emptyState: {
    minHeight: "440px",
    borderRadius: theme.radius.xl,
    background: "linear-gradient(135deg, #FFFFFF, #EEF2FF)",
    border: `1px solid ${theme.colors.border}`,
    boxShadow: theme.shadow.sm,
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    padding: "40px",
  },

  emptyIcon: {
    width: "90px",
    height: "90px",
    borderRadius: "30px",
    display: "grid",
    placeItems: "center",
    fontSize: "44px",
    background: "#fff",
    boxShadow: theme.shadow.sm,
    margin: "0 auto 18px",
  },

  emptyTitle: {
    margin: 0,
    fontSize: "36px",
    fontWeight: 950,
  },

  emptyText: {
    margin: "12px auto 0",
    color: theme.colors.textMuted,
    maxWidth: "520px",
    lineHeight: 1.7,
    fontWeight: 600,
  },
};

export default MyOrders;