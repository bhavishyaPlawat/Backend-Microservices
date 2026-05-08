import axios from "axios";

const paymentsApi = axios.create({
  baseURL: "/api/payments",
});

function getErrorMessage(error, fallbackMessage) {
  return error.response?.data?.message || fallbackMessage;
}

export async function createPaymentOrder(productId) {
  try {
    const { data } = await paymentsApi.post(`/create-order/${productId}`);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to create payment order"));
  }
}

export async function verifyPayment(payload) {
  try {
    const { data } = await paymentsApi.post("/verify", payload);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Payment verification failed"));
  }
}
