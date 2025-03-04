import axios from "axios";

let baseUrl="https://project-node-9sow.onrender.com/api/user";
export function login(email, password){
    return axios.post(baseUrl+"/login",{ email:email, password:password});
}
export function addUser(userObj){
    return axios.post(baseUrl, userObj)
    // ,{
    // headers: {
    //     "Content-Type": "application/json"
    // }}
}
// export function updateUser(userObj){
//     return axios.post()
// }

