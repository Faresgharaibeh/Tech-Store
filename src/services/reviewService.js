import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const reviewsRef = collection(db, "reviews");

export const addReview = async (reviewData) => {
  const docRef = await addDoc(reviewsRef, {
    ...reviewData,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};

export const getReviewsByProductId = async (productId) => {
  const q = query(
    reviewsRef,
    where("productId", "==", productId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};