import { createSlice } from "@reduxjs/toolkit";
import { login } from "../assets/api/UserServicce";
const storedUser = localStorage.getItem("user");
const initialState={
   
    currentUser: storedUser && storedUser !== "undefined" && storedUser !== "null" ? JSON.parse(storedUser) : null,
    token: localStorage.getItem("token") || null
}



const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userIn:(state, action)=>{
            console.log(action.payload)
            state.currentUser=action.payload.data||action.payload.user;
            state.token=action.payload.token;
            localStorage.setItem("user",JSON.stringify(state.currentUser))
        },
        userOut:(state)=>{
            state.currentUser=null,
            state.token= null
            localStorage.setItem("user",null)
            localStorage.removeItem("token");
        }
        
    }
})

export const {userIn,userOut} = userSlice.actions
export default userSlice.reducer