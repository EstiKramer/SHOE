import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
    arr: [],
    sum: 0,
    count: 0
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let index = state.arr.findIndex(item=>item._id == action.payload)
            if (index > -1)
                state.arr[index].qty++;
            else
                state.arr.push({ ...action.payload, qty: 1 })
            state.sum=sum+action.payload.price
            state.count++},
        removeFromCart:(state, action)=>{
            state.arr = state.arr.filter(item=>item_id!=action.payload)
            state.sum-=action.payload.price
            state.count-- 
        },
        reduceFromCart: (state, action)=>{
            let index = state.arr.findIndex(item=>item._id == action.payload)
            if(state[index].qty==1)
                state.arr.slice(index,1)
            else
                state[index].qty-- ;
            state.sum-=action.payload.price
            state.count--  }    
        }
        }
)
export const {addToCart, removeFromCart, reduceFromCart}=cartSlice.actions
export default cartSlice.reducer;
