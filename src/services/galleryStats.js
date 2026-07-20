import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from "firebase/firestore";

import { db } from "./firebase";

// Get or Create Stats
export const getGalleryStats = async (id) => {
  try {

    const ref = doc(db, "gallery_stats", String(id));

    const snap = await getDoc(ref);

    if (!snap.exists()) {

      await setDoc(ref, {
        likes: 0,
        views: 0,
      });

      return {
        likes: 0,
        views: 0,
      };
    }

    return snap.data();

  } catch (err) {

    console.error(err);

    return {
      likes: 0,
      views: 0,
    };

  }
};

// Increment Views
export const incrementViews = async (id) => {
  const ref = doc(db, "gallery_stats", String(id));

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      likes: 0,
      views: 1,
    });

    return;
  }

  await updateDoc(ref, {
    views: increment(1),
  });
};

// Increment Likes
export const incrementLikes = async (id) => {
  const ref = doc(db, "gallery_stats", String(id));

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      likes: 1,
      views: 0,
    });

    return;
  }

  await updateDoc(ref, {
    likes: increment(1),
  });
};

export const decrementLikes = async (id) => {
  const ref = doc(db, "gallery_stats", String(id));

  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  if (data.likes <= 0) return;

  await updateDoc(ref, {
    likes: increment(-1),
  });
};