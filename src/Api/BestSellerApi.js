import axios from "axios";

const bestSellerProd = axios.create({
  baseURL: "http://localhost:4000/api/v1/bestseller",
});

export const getBestSellerProd = async () => {
  const response = await bestSellerProd.get("/");
  return response.data;
};
