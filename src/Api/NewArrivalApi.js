import axios from "axios";

const newArrivalApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/new-arrival",
});

export const getNewArrivalProd = async () => {
  const response = await newArrivalApi.get("/");
  return response.data;
};
