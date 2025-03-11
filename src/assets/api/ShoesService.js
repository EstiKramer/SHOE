import axios from "axios"


let baseUrl="https://project-node-9sow.onrender.com/api/product";
export function GetAllProducts(index){
    return axios.get(baseUrl+"limit=10&page="+index)
}
export function GetAllProductsPages(){
    return axios.get(`${baseUrl}/totalPages?limit=1`);
}

