import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";
import { auth } from "./firebase";

export const saveFavorite = async ({
  prompt,
  response,
}) => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    await addDoc(
      collection(db, "users", user.uid, "favorites"),
      {
        prompt,
        response,
        createdAt: serverTimestamp(),
      }
    );
  } catch (err) {
    console.error("Save Favorite Error:", err);
  }
};

export const getFavorites = async () => {
  const user = auth.currentUser;

  if (!user) return [];

  try {

    const q = query(
      collection(db, "users", user.uid, "favorites"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  } catch (err) {

    console.error("Get Favorite Error:", err);

    return [];

  }
};

export const deleteFavorite = async (id) => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    await deleteDoc(
      doc(db, "users", user.uid, "favorites", id)
    );
  } catch (err) {
    console.error("Delete Favorite Error:", err);
  }
};

export const clearAllFavorites = async () => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    const snapshot = await getDocs(
      collection(db, "users", user.uid, "favorites")
    );

    await Promise.all(
      snapshot.docs.map((item) => deleteDoc(item.ref))
    );
  } catch (err) {
    console.error("Clear Favorite Error:", err);
  }
};