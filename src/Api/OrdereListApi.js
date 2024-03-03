import axios from "axios";

const orderListApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/order-list",
});
export const getOrderList = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await orderListApi.get("/", config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch order list");
  }
};

export const postOrderList = async (prod) => {
  return await orderListApi.post("/", prod);
};
