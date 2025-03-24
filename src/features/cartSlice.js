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
            const {product, size} = action.payload;
            let index = state.arr.findIndex(item=>item._id == product._id)
            if (index > -1)
                state.arr[index].qty++;
            else
                state.arr.push({ ...action.payload, qty: 1 })
            state.sum+=product.price
            state.count++},
        removeFromCart:(state, action)=>{
            state.arr = state.arr.filter(item=>item_id!=action.payload._id)
            state.sum-=action.payload.price
            state.count-- 
        },
        reduceFromCart: (state, action)=>{
            let index = state.arr.findIndex(item=>item._id == action.payload._id)
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
