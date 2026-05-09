import axios from "axios";

const productsApi = axios.create({
  baseURL: "/api/products",
});

function getErrorMessage(error, fallbackMessage) {
  return error.response?.data?.message || fallbackMessage;
}

export async function getProducts() {
  try {
    const { data } = await productsApi.get("/get-products");
    return data.products || [];
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to fetch products"));
  }
}

export async function createProduct(product) {
  try {
    const { data } = await productsApi.post("/", product);
    return data.product;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to create product"));
  }
}

export async function deleteProduct(productId) {
  try {
    const { data } = await productsApi.delete(`/${productId}`);
    return data;
  } catch (error) {
    throw new Error(getErrorMessage(error, "Failed to delete product"));
  }
}
