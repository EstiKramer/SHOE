import { createSlice } from "@reduxjs/toolkit";
import { login } from "../assets/api/UserServicce";

const initialState={
    // currentUser:null,
    // token:null
    currentUser: JSON.parse(localStorage.getItem("user")) || null, // טעינת משתמש מה-localStorage
    token: localStorage.getItem("token") || null
}

const updateLocalStorage = (state) => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
    localStorage.setItem("token", state.token);
};

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userIn:(state, action)=>{
            state.currentUser=action.payload.user;
            state.token=action.payload.token;
            updateLocalStorage(state); 
        },
        userOut:(state)=>{
            state.currentUser=null,
            state.token= null
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        }
        
    }
})

export const {userIn,userOut} = userSlice.actions
export default userSlice.reducer