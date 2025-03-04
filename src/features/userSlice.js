import { createSlice } from "@reduxjs/toolkit";
import { login } from "../assets/api/UserServicce";

const initialState={
    currentUser:null
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        userIn:(state, action)=>{
            state.currentUser=action.payload;
        },
        userOut:()=>{
            state.currentUser=null
        }
        
    }
})

export const {userIn,userOut} = userSlice.actions
export default userSlice.reducer