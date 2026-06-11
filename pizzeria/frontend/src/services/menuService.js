const BASE_URL = "http://localhost:5000/api/menu";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// ✅ Updated: only add category query if not "all"
export const getMenuItems = async (category) => {
  const url =
    category && category !== "all"
      ? `${BASE_URL}?category=${category}`
      : BASE_URL;

  const response = await fetch(url, {
    headers: getHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to load menu");
  }

  return data;
};

export const createMenuItem = async (itemData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(itemData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to create item");
  }

  return data;
};

export const deleteMenuItem = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  return await response.json();
};

export const updateMenuItem = async (id, itemData) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(itemData),
  });

  return await response.json();
};
