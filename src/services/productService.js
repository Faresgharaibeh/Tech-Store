import {
  collection,
  getDocs,
  query,
  where,
  limit,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

const productsRef = collection(db, "products");

export const getProductsByCategory = async (category) => {
  const q = query(productsRef, where("category", "==", category), limit(4));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsRef);

  return snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
};

export const getProductById = async (id) => {
  if (!id) return null;

  const docRef = doc(db, "products", id);
  const snapshot = await getDoc(docRef);

  if (snapshot.exists()) {
    return {
      id: snapshot.id,
      ...snapshot.data(),
    };
  }

  return null;
};

export const getRelatedProducts = async (category, currentProductId) => {
  const q = query(productsRef, where("category", "==", category), limit(8));
  const snapshot = await getDocs(q);

  const products = snapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));

  return products
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);
};