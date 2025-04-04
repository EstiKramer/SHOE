// import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react";
// const initialState = {
//     // arr: localStorage.getItem("cart") && localStorage.getItem("cart") !== "undefined" ? JSON.parse(localStorage.getItem("cart")) : [],
//     // // arr: JSON.parse(localStorage.getItem("cart")) || [],
//     // sum: JSON.parse(localStorage.getItem("sum")) || 0,
//     // count: JSON.parse(localStorage.getItem("count")) || 0
   
//         arr: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
//         sum: localStorage.getItem("sum")?Number(localStorage.getItem("sum")): 0,
//         count: localStorage.getItem("count")?Number(localStorage.getItem("count")) : 0
    

//     // arr: [],
//     // sum: 0,
//     // count: 0
// }

// // const updateLocalStorage = (state) => {
// //     localStorage.setItem("arr", JSON.stringify(state.arr));
// //     localStorage.setItem("sum", JSON.stringify(state.sum));
// //     localStorage.setItem("count", JSON.stringify(state.count));
// //     console.log("LocalStorage updated:", {
// //         arr: localStorage.getItem("arr"),
// //         sum: localStorage.getItem("sum"),
// //         count: localStorage.getItem("count")
// //     });
// // };

// const cartSlice = createSlice({
//     name: "cart",
//     initialState,
//     reducers: {
//         addToCart: (state, action) => {
//             console.log("Adding to cart:", action.payload);

//             const {product, size} = action.payload;
//             let index = state.arr.findIndex(item=>item._id == product._id)
//             if (index > -1){
//                 state.arr[index].qty++;}
//             else{
//                 state.arr.push({ product, qty: 1 })}
//             state.sum+=product.price
//             state.count++
//             console.log("Cart after adding:", JSON.stringify(state.arr, null, 2));
//             localStorage.setItem("cart",JSON.stringify(state.arr))
//             localStorage.setItem("sum",state.sum)
//             localStorage.setItem("count",state.count)

//         },
//         removeFromCart: (state, action) => {

//             state.arr= state.arr.filter(item => item.product._id!= action.payload.product._id);
          
//                 state.sum -= action.payload.product.price
//                 state.count--;
            
//         console.log(JSON.stringify(state.arr,null,2))
//         localStorage.setItem("cart",JSON.stringify(state.arr))
//         localStorage.setItem("sum",state.sum)
//         localStorage.setItem("count",state.count)}
//         ,
//         reduceFromCart: (state, action)=>{
//             let index = state.arr.findIndex(item=>item._id == action.payload._id)
//             if(state.arr[index].qty==1){
//                 state.arr.splice(index,1)}
//             else{
//                 state[index].qty-- ;}
//             state.sum-=action.payload.price
//             state.count-- 
//             console.log(JSON.stringify(state.arr,null,2))
//             localStorage.setItem("cart",JSON.stringify(state.arr))
//             localStorage.setItem("sum",state.sum)
//             localStorage.setItem("count",state.count) },
//             clearCart: (state) => {
//                 state.arr = [];
//                 state.sum = 0;
//                 state.count = 0;
//                 console.log(JSON.stringify(state.arr,null,2))
//                 localStorage.setItem("cart",[])
//                 localStorage.setItem("sum",0)
//                 localStorage.setItem("count",0)
//             }   
        
//         }}
// )
// export const {addToCart, removeFromCart, reduceFromCart, clearCart}=cartSlice.actions
// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    arr: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    sum: localStorage.getItem("sum") ? Number(localStorage.getItem("sum")) : 0,
    count: localStorage.getItem("cnt") ? Number(localStorage.getItem("cnt")) : 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { product, size } = action.payload;
            // מציאת פרטי המידה מתוך המוצר
            const sizeDetails = product.sizes.find((size1) => size1.size === size);
            
            // אם המידה במלאי נמוכה או לא קיימת
            if (!sizeDetails || sizeDetails.stock <= 0) {
                alert("Out of stock");
                return;
            }

            // חיפוש אם המוצר כבר קיים בעגלה עם אותה מידה
            let index = state.arr.findIndex(item => item.product._id === product._id && item.size === size);
            if (index > -1) {
                state.arr[index].qty++; // אם קיים, הגדל את הכמות
            } else {
                state.arr.push({ product, qty: 1, size }); // אם לא קיים, הוסף אותו
            }
            state.sum += product.price; // עדכון הסכום
            state.count++; // עדכון מספר המוצרים

            // עדכון ב-localStorage
            localStorage.setItem("cart", JSON.stringify(state.arr));
            localStorage.setItem("sum", state.sum);
            localStorage.setItem("cnt", state.count);
        },

        removeFromCart: (state, action) => {
            // סינון המוצר מהעגלה
            // const product = state.arr.find(item => item.product._id === action.payload.product._id);
            let index = state.arr.findIndex(item => item.product._id === action.payload.product._id);

            // state.arr = state.arr.filter(item => item.product._id !== action.payload.product._id );
            // עדכון הסכום ומספר המוצרים
            // state.sum = state.sum-(action.payload.product.price*action.payload.product.qty);
            // state.count=state.count-action.payload.product.qty; 
            if (index > -1) {
                // מפחיתים את הסכום ואת הכמות בצורה תקינה
                state.sum -= state.arr[index].product.price * state.arr[index].qty;
                state.count -= state.arr[index].qty;
        
                // מוחקים את המוצר מהמערך
                state.arr.splice(index, 1);
            }
            // עדכון ב-localStorage
            localStorage.setItem("cart", JSON.stringify(state.arr));
            localStorage.setItem("sum", state.sum);
            localStorage.setItem("cnt", state.count);
        },

        reduceFromCart: (state, action) => {
            // חיפוש המוצר בעגלה
            let index = state.arr.findIndex(item => item.product._id === action.payload.product._id && item.size === action.payload.size);
            if (index > -1) {
                // אם הכמות היא 1, נמחק את המוצר
                if (state.arr[index].qty === 1) {
                    state.arr.splice(index, 1);
                } else {
                    // אחרת, נוריד כמות
                    state.arr[index].qty--;
                }
                // עדכון הסכום ומספר המוצרים
                state.sum -= action.payload.product.price;
                state.count--; 

                // עדכון ב-localStorage
                localStorage.setItem("cart", JSON.stringify(state.arr));
                localStorage.setItem("sum", state.sum);
                localStorage.setItem("cnt", state.count);
            }
        },

        clearCart: (state) => {
            // נקה את העגלה, הסכום ומספר המוצרים
            state.arr = [];
            state.sum = 0;
            state.count = 0;

            // עדכון ב-localStorage
            localStorage.setItem("cart", JSON.stringify([]));
            localStorage.setItem("sum", 0);
            localStorage.setItem("cnt", 0);
        }
    }
});

export const { addToCart, removeFromCart, reduceFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
