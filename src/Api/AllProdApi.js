import axios from "axios";

const allProdApi = axios.create({
    baseURL : "http://localhost:4000/api/v1/all-products"

})

export const getAllProd = async () => {
    const response = await allProdApi.get("/")
    return response.data
}