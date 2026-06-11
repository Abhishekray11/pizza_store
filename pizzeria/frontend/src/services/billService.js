const API_URL =
  "http://localhost:5000/api/bills";

export async function getMyBills() {

  const token =
    localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/my-bills`,
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
      data.error ||
      "Failed to fetch bills"
    );
  }

  return data;
}

export async function downloadInvoice(
  billId
) {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      `${API_URL}/invoice/${billId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  if (!response.ok) {

    throw new Error(
      "Invoice download failed"
    );

  }

  const blob =
    await response.blob();

  const url =
    window.URL.createObjectURL(
      blob
    );

  const a =
    document.createElement("a");

  a.href = url;

  a.download =
    `invoice-${billId}.pdf`;

  document.body.appendChild(a);

  a.click();

  a.remove();

  window.URL.revokeObjectURL(
    url
  );
}
export async function generateBill(
  orderId
) {
  const token =
    localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/generate/${orderId}`,
    {
      method: "POST",
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  const data =
    await res.json();

  if (!res.ok) {
    throw new Error(
      data.error ||
      "Failed to generate bill"
    );
  }

  return data;
}