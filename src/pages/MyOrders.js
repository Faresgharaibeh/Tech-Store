import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrdersByUserId } from "../services/orderService";
import { theme } from "../styles/theme";

function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user?.uid) return;

    getOrdersByUserId(user.uid).then(setOrders);
  }, [user]);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>My Orders</h1>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} style={styles.card}>
              <div style={styles.header}>
                <span>ID: {order.id}</span>
                <span style={styles.status}>{order.status}</span>
              </div>

              <div>
                {order.items.map((item, i) => (
                  <div key={i} style={styles.item}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={styles.total}>
                Total: ${order.totalPrice.toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    background: theme.colors.background,
    padding: "30px",
  },
  container: {
    maxWidth: "1000px",
    margin: "auto",
  },
  title: {
    marginBottom: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "20px",
    boxShadow: theme.shadow.sm,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  status: {
    color: theme.colors.accent,
    fontWeight: "bold",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px",
  },
  total: {
    marginTop: "10px",
    fontWeight: "bold",
  },
};

export default MyOrders;