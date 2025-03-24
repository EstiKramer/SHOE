import axios from "axios"

let baseUrl = "http://localhost:3000/api/order"
// let baseUrl="https://project-node-9sow.onrender.com/api/order";
export function addOrder(orderObj, token){
    return axios.post(baseUrl, orderObj,{
    headers: {
        Authorization: `Bearer ${token}`, // שלח את ה-Token ב-headers
    }
})}