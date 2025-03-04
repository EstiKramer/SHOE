import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "../features/cartSlice.js"
import userSlice from "../features/userSlice.js"

export const store=configureStore({
    reducer:{
        user:userSlice,
        cart:cartSlice
    }
})