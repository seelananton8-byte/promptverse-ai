import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebase";
import { auth } from "./firebase";

export const saveGalleryFavorite = async (item) => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    await addDoc(
      collection(db, "users", user.uid, "galleryFavorites"),
      {
        galleryId: item.id,
        title: item.title,
        image: item.image,
        category: item.category,
        prompt: item.prompt,
        likes: item.likes,
        views: item.views,
        createdAt: serverTimestamp(),
      }
    );
  } catch (err) {
    console.error("Save Gallery Favorite Error:", err);
  }
};

export const getGalleryFavorites = async () => {
  const user = auth.currentUser;

  if (!user) return [];

  try {

    const q = query(
      collection(db, "users", user.uid, "galleryFavorites"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

  } catch (err) {

    console.error("Get galleryFavorites Error:", err);

    return [];

  }
};

export const deleteGalleryFavorite = async (galleryId) => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    const snapshot = await getDocs(
      collection(db, "users", user.uid, "galleryFavorites")
    );

    const docToDelete = snapshot.docs.find(
      (doc) => doc.data().galleryId === galleryId
    );

    if (docToDelete) {
      await deleteDoc(docToDelete.ref);
    }
  } catch (err) {
    console.error("Delete Gallery Favorite Error:", err);
  }
};

export const clearAllGalleryFavorites = async () => {
  const user = auth.currentUser;

  if (!user) return;

  try {
    const snapshot = await getDocs(
      collection(db, "users", user.uid, "galleryFavorites")
    );

    await Promise.all(
      snapshot.docs.map((item) => deleteDoc(item.ref))
    );
  } catch (err) {
    console.error("Clear galleryFavorites Error:", err);
  }
};