const STORAGE_KEY = "history";

export const saveHistoryLocal = ({
  category,
  title,
  prompt,
  output,
}) => {
  const history = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  history.unshift({
    id: Date.now().toString(),
    category,
    title,
    prompt,
    output,
    createdAt: new Date().toISOString(),
  });

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(history)
  );
};

export const getHistoryLocal = async () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );
};

export const deleteHistoryLocal = async (id) => {
  const history = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  );

  const updatedHistory = history.filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedHistory)
  );
};

export const clearAllHistoryLocal = async () => {
  localStorage.removeItem(STORAGE_KEY);
};