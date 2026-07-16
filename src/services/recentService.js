export const addRecent = (title, subtitle = "") => {
  const recent =
    JSON.parse(localStorage.getItem("recent")) || [];

  const filtered = recent.filter(
    (item) => item.title !== title
  );

  filtered.unshift({
    title,
    subtitle,
    time: new Date().toISOString(),
  });

  localStorage.setItem(
    "recent",
    JSON.stringify(filtered.slice(0, 10))
  );

  window.dispatchEvent(new Event("recent-updated"));
};

export const getRecent = () => {
  return JSON.parse(localStorage.getItem("recent")) || [];
};

export const formatRecentTime = (date) => {
  const now = new Date();
  const itemDate = new Date(date);

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const itemDay = new Date(
    itemDate.getFullYear(),
    itemDate.getMonth(),
    itemDate.getDate()
  );

  const diff =
    Math.floor(
      (today - itemDay) /
        (1000 * 60 * 60 * 24)
    );

  const time = itemDate.toLocaleTimeString("en-US",
    {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
  .replace("am", "AM")
  .replace("pm", "PM");

  if (diff === 0) {
    return `Today • ${time}`;
  }

  if (diff === 1) {
    return `Yesterday • ${time}`;
  }

  return `${diff} days ago`;
};