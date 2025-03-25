import axios from "axios"

// let baseUrl = "http://localhost:3000/api/product"
let baseUrl="https://project-node-9sow.onrender.com/api/product";
export function GetAllProducts(index){
    return axios.get(baseUrl+"?limit=10&page="+index)
    
}
export function GetAllProductsPages(){
    return axios.get(`${baseUrl}+/totalPages?limit=10`);
}
export function GetProductByID(id){
    return axios.get(`${baseUrl}/${id}`);
}
export function AddProductDetails(productObj, token){
    return axios.post(baseUrl, productObj, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export function Update(productObj, token){
    return axios.put(`${baseUrl}/${productObj._id}`, productObj, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export function Delete(id, token){
    return axios.delete(`${baseUrl}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


