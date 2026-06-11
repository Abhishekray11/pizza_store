const API_URL =
  "http://localhost:5000/api/dashboard";

export async function getStats() {

  const token =
    localStorage.getItem("token");

  const res =
    await fetch(
      `${API_URL}/stats`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data.error
    );
  }

  return data;
}

export async function getMonthlyRevenue() {

  const token =
    localStorage.getItem("token");

  const res =
    await fetch(
      `${API_URL}/monthly-revenue`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data.error
    );
  }

  return data;
}

export async function getRecentOrders() {

  const token =
    localStorage.getItem("token");

  const res =
    await fetch(
      `${API_URL}/recent-orders`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data.error
    );
  }

  return data;
}