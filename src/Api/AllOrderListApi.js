import axios from "axios";

const AllOrderListApi = axios.create({
  baseURL: "http://localhost:4000/api/v1/order-list/all-orderlist",
});
export const getOrderList = async () => {
    const response = await AllOrderListApi.get("/");
    return response.data;
 
};
