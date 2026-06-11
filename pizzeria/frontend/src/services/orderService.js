const BASE_URL = "http://localhost:5000/api/orders";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const placeOrder = async (orderData) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(orderData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to place order");
  }

  return data;
};

export const getMyOrders = async () => {
  const response = await fetch(
    `${BASE_URL}/my-orders`,
    {
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return data;
};

export const cancelOrder = async (orderId) => {
  const response = await fetch(
    `${BASE_URL}/${orderId}/cancel`,
    {
      method: "POST",
      headers: getHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to cancel order");
  }

  return data;
};