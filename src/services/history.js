import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";
import { auth } from "./firebase";

export const saveHistory = async ({
  category,
  title,
  prompt,
  output,
}) => {
  const user = auth.currentUser;

  console.log("Current User:", user);

  if (!user) {
    console.log("No user found");
    return;
  }

  try {
    const docRef = await addDoc(
      collection(db, "users", user.uid, "history"),
      {
        category,
        title,
        prompt,
        output,
        createdAt: serverTimestamp(),
      }
    );

    console.log("Saved ID:", docRef.id);

  } catch (err) {
    console.error("Firestore Save Error:", err);
  }
};

export const getHistory = async () => {
  const user = auth.currentUser;

  if (!user) return [];

  const q = query(
    collection(db, "users", user.uid, "history"),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const deleteHistory = async (id) => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    await deleteDoc(
      doc(db, "users", user.uid, "history", id)
    );
  } catch (err) {
    console.error(err);
  }
};

export const clearAllHistory = async () => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    const snapshot = await getDocs(
      collection(db, "users", user.uid, "history")
    );

    await Promise.all(
      snapshot.docs.map((item) => deleteDoc(item.ref))
    );

  } catch (err) {
    console.error(err);
  }
};