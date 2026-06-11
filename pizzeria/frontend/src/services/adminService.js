const BASE_URL = "http://localhost:5000/api/admin";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getOrders = async () => {

  const response =
    await fetch(
      "http://localhost:5000/api/orders",
      {
        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`
        }
      }
    );

  const data =
    await response.json();

  return data;
};

export const getRevenue = async () => {
  const response = await fetch(
    `${BASE_URL}/revenue`,
    {
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch revenue");
  }

  return data;
};

export const updateOrderStatus = async (
  orderId,
  status
) => {
  const response = await fetch(
    `${BASE_URL}/orders/${orderId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to update status");
  }

  return data;
};