const BASE_URL =
"http://localhost:5000/api/notifications";

const getHeaders = () => ({
  Authorization:
  `Bearer ${localStorage.getItem("token")}`
});

export const getNotifications =
async () => {

  const res =
  await fetch(
      `${BASE_URL}/my`,
      {
        headers:getHeaders()
      }
  );

  return await res.json();
};


export const markNotificationRead = async (id) => {
  const response = await fetch(
    `http://localhost:5000/api/notifications/${id}/read`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return await response.json();
};