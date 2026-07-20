import {
  incrementLikes,
  decrementLikes,
  getGalleryStats,
} from "./galleryStats";

export const toggleGalleryFavorite = async ({
  item,
  isFavorite,
  toggleFavorite,
}) => {

  const exists = isFavorite(item.id);

  await toggleFavorite(item);

  if (!exists) {
    await incrementLikes(item.id);
  } else {
    await decrementLikes(item.id);
  }

  return await getGalleryStats(item.id);

};