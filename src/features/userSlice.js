import { createSlice } from "@reduxjs/toolkit";
import { login } from "../assets/api/UserServicce";

const initialState={
    currentUser:null,
    token:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userIn:(state, action)=>{
            state.currentUser=action.payload.user;
            state.token=action.payload.token;
        },
        userOut:()=>{
            state.currentUser=null,
            state.token= null
        }
        
    }
})

export const {userIn,userOut} = userSlice.actions
export default userSlice.reducer