import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

const ordersRef = collection(db, "orders");

export const createOrder = async (orderData) => {
  const cleanOrderData = {
    customer: {
      fullName: orderData.customer?.fullName || "",
      phone: orderData.customer?.phone || "",
      address: orderData.customer?.address || "",
      city: orderData.customer?.city || "",
      notes: orderData.customer?.notes || "",
      email: orderData.customer?.email || "",
      uid: orderData.customer?.uid || "",
    },
    payment: {
      method: orderData.payment?.method || "cash_on_delivery",
      cardName: orderData.payment?.cardName || "",
      cardNumberLast4: orderData.payment?.cardNumberLast4 || "",
      paymentStatus:
        orderData.payment?.method === "credit_card" ||
        orderData.payment?.method === "paypal"
          ? "paid"
          : "cash_on_delivery",
    },
    items: (orderData.items || []).map((item) => ({
      id: item.id || "",
      name: item.name || "",
      brand: item.brand || "",
      price: Number(item.price) || 0,
      quantity: Number(item.quantity) || 1,
      category: item.category || "",
    })),
    totalPrice: Number(orderData.totalPrice) || 0,
    createdAt: serverTimestamp(),
    status: "pending",
  };

  const docRef = await addDoc(ordersRef, cleanOrderData);
  return docRef.id;
};

export const getOrdersByUserId = async (uid) => {
  if (!uid) return [];

  const q = query(
    ordersRef,
    where("customer.uid", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};