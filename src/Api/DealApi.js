import axios from "axios";

const dealProdApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/deal",
});

export const getDealProd = async () => {
  const response = await dealProdApi.get("/");
  return response.data;
};
