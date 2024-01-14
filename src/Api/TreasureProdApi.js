import axios from "axios";

const treasureProdApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/treasure-products",
});

export const getTreasureProd = async () => {
  const response = await treasureProdApi.get("/");
  return response.data;
};
