import axios from "axios";

// let baseUrl = "http://localhost:3000/api/user"

let baseUrl="https://project-node-9sow.onrender.com/api/user";
export function login(email, password){
    console.log("Logging in with", email, password);  
    return axios.post(baseUrl+"/login",{ email:email, password:password});
}
export function addUser(userObj){
    console.log("Sending data:", userObj);
    return axios.post(baseUrl, userObj)
}


