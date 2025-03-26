import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";
const initialState = {
    // arr: localStorage.getItem("cart") && localStorage.getItem("cart") !== "undefined" ? JSON.parse(localStorage.getItem("cart")) : [],
    // // arr: JSON.parse(localStorage.getItem("cart")) || [],
    // sum: JSON.parse(localStorage.getItem("sum")) || 0,
    // count: JSON.parse(localStorage.getItem("count")) || 0
   
        arr: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
        sum: localStorage.getItem("sum")?Number(localStorage.getItem("sum")): 0,
        count: localStorage.getItem("count")?Number(localStorage.getItem("count")) : 0
    

    // arr: [],
    // sum: 0,
    // count: 0
}

// const updateLocalStorage = (state) => {
//     localStorage.setItem("arr", JSON.stringify(state.arr));
//     localStorage.setItem("sum", JSON.stringify(state.sum));
//     localStorage.setItem("count", JSON.stringify(state.count));
//     console.log("LocalStorage updated:", {
//         arr: localStorage.getItem("arr"),
//         sum: localStorage.getItem("sum"),
//         count: localStorage.getItem("count")
//     });
// };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            console.log("Adding to cart:", action.payload);

            const {product, size} = action.payload;
            let index = state.arr.findIndex(item=>item._id == product._id)
            if (index > -1){
                state.arr[index].qty++;}
            else{
                state.arr.push({ product, qty: 1 })}
            state.sum+=product.price
            state.count++
            console.log("Cart after adding:", JSON.stringify(state.arr, null, 2));
            localStorage.setItem("cart",JSON.stringify(state.arr))
            localStorage.setItem("sum",state.sum)
            localStorage.setItem("count",state.count)

        },
        removeFromCart: (state, action) => {

            state.arr= state.arr.filter(item => item.product._id!= action.payload.product._id);
          
                state.sum -= action.payload.product.price
                state.count--;
            
        console.log(JSON.stringify(state.arr,null,2))
        localStorage.setItem("cart",JSON.stringify(state.arr))
        localStorage.setItem("sum",state.sum)
        localStorage.setItem("count",state.count)}
        ,
        reduceFromCart: (state, action)=>{
            let index = state.arr.findIndex(item=>item._id == action.payload._id)
            if(state.arr[index].qty==1){
                state.arr.splice(index,1)}
            else{
                state[index].qty-- ;}
            state.sum-=action.payload.price
            state.count-- 
            console.log(JSON.stringify(state.arr,null,2))
            localStorage.setItem("cart",JSON.stringify(state.arr))
            localStorage.setItem("sum",state.sum)
            localStorage.setItem("count",state.count) },
            clearCart: (state) => {
                state.arr = [];
                state.sum = 0;
                state.count = 0;
                console.log(JSON.stringify(state.arr,null,2))
                localStorage.setItem("cart",[])
                localStorage.setItem("sum",0)
                localStorage.setItem("count",0)
            }   
        
        }}
)
export const {addToCart, removeFromCart, reduceFromCart, clearCart}=cartSlice.actions
export default cartSlice.reducer;
