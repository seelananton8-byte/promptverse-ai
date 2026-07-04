import { useEffect, useState } from "react";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem("galleryFavorites")
      ) || [];

    setFavorites(saved);
  }, []);

  const toggleFavorite = (id) => {
    let updatedFavorites;

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(
        (favoriteId) => favoriteId !== id
      );
    } else {
      updatedFavorites = [
        ...favorites,
        id,
      ];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "galleryFavorites",
      JSON.stringify(updatedFavorites)
    );
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
  };
}