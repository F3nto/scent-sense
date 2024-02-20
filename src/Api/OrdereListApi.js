import axios from "axios";

const orderListApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/order-list",
});

export const getOrderList = async () => {
  const response = await orderListApi.get("/");
  return response.data;
};

export const postOrderList = async (prod) => {
  return await orderListApi.post("/", prod);
};
