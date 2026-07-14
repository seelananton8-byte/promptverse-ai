const STORAGE_KEY = "favorites";

export const saveFavoriteLocal = ({
  prompt,
  response,
}) => {
  try {
    const favorites = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );

    favorites.unshift({
      id: Date.now().toString(),
      prompt,
      response,
      createdAt: new Date().toISOString(),
    });

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites)
    );
  } catch (err) {
    console.error("Save Favorite Local Error:", err);
  }
};

export const getFavoritesLocal = async () => {
  try {
    return JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]"
    );
  } catch (err) {
    console.error("Get Favorite Local Error:", err);
    return [];
  }
};

export const deleteFavoriteLocal = async (id) => {
  try {

  const favorites = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  const updated = favorites.filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  );

} catch (err) {

  console.error("Delete Favorite Local Error:", err);

}
};

export const clearAllFavoritesLocal = async () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Clear Favorite Local Error:", err);
  }
};