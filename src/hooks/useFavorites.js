import { useEffect, useState } from "react";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

import {
  saveGalleryFavorite,
  getGalleryFavorites,
  deleteGalleryFavorite,
} from "../services/galleryFavorites";

import {
  saveGalleryFavoriteLocal,
  getGalleryFavoritesLocal,
  deleteGalleryFavoriteLocal,
} from "../services/galleryFavoritesLocal";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getGalleryFavorites();

        setFavorites(data.map((item) => item.galleryId));
      } else {
        const data = await getGalleryFavoritesLocal();

        setFavorites(data.map((item) => item.galleryId));
      }
    });

    return () => unsubscribe();
  }, []);

  const toggleFavorite = async (item) => {
    if (auth.currentUser) {
      const exists = favorites.includes(item.id);

      if (exists) {
        await deleteGalleryFavorite(item.id);

        setFavorites((prev) =>
          prev.filter((id) => id !== item.id)
        );
        toast.success("Removed from Favorites 🗑️");
      } else {
        await saveGalleryFavorite(item);

        setFavorites((prev) => [...prev, item.id]);

        toast.success("Added to Favorites ❤️");
      }
    } else {
      const exists = favorites.includes(item.id);

      if (exists) {
        await deleteGalleryFavoriteLocal(item.id);

        setFavorites((prev) =>
          prev.filter((id) => id !== item.id)
        );
        toast.success("Removed from Favorites 🗑️");
      } else {
        await saveGalleryFavoriteLocal(item);

        setFavorites((prev) => [...prev, item.id]);

        toast.success("Added to Favorites ❤️");
      }
    }
  };

  const isFavorite = (id) => favorites.includes(id);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}