import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import{  Router, Route, Routes} from 'react-router-dom'

import './App.css'
import Checkout from './assets/pages/Checkout.jsx'
import SignUp from './assets/pages/SignUp'
import Login from './assets/pages/Login'
import ProductList from './assets/pages/ProductList'
import ProductDetails from './assets/pages/ProductDetails'
import GuestNavbar from './assets/components/GuestNavbar.jsx'
import UserNavbar from './assets/components/UserNavbar.jsx'
import ManagerNavbar from './assets/components/ManagerNavbar.jsx'
import Cart from './assets/pages/Cart.jsx'
import UpdateProduct from './assets/pages/UpdateProduct.jsx'
import AddProduct from './assets/pages/AddProduct.jsx'
import { useSelector } from 'react-redux'
import { userIn } from './features/userSlice.js'
import { useDispatch } from 'react-redux'


function App() {
  const dispatch = useDispatch()
  const role = useSelector((state)=>state.user.currentUser?.role)||"guest"
  const cart = useSelector((state)=>state.cart)
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    const data = (userFromStorage && userFromStorage !== "undefined") ? JSON.parse(userFromStorage) : null;
    const token = localStorage.getItem("user")||null;
    
    dispatch(userIn({data, token})); 
}, []);

const [flag, setflag] =useState(false)
const [c, setc] = useState("guest")
const product =   {
  "_id": "67e135b01ba1c5ab3f8b1d23",
  "productName": "NIKE",
  "description": "AAAAA",
  "DateOfManufacture": "2025-03-12T00:00:00.000Z",
  "imagePath": "drryjthergefa",
  "price": 250,
  "sizes": [
      {
          "size": 40,
          "stock": 5,
          "_id": "67e135b01ba1c5ab3f8b1d24"
      }
  ],
  "type": [
      "sport"
  ],
  "__v": 0
}
function changeflag(flag){
  setflag(flag)
}
// localStorage.setItem("sum",0)
// localStorage.setItem("count",0)
// localStorage.setItem("arr",[])
localStorage.removeItem("arr");

// localStorage.setItem("user",null)

  return (
    <>
    {role=="guest"&&<GuestNavbar />}
    {role=="user"&&<UserNavbar />}
    {role=="admin"&&<ManagerNavbar />} 
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={ <SignUp />} />
      <Route path="/list" element={ <ProductList changeflag={changeflag}/>} />
      <Route path="/addProduct" element={ <AddProduct />} />
      <Route path="/updateProduct/:id" element={ <UpdateProduct/>} />
      <Route path="/list/product/:id" element={<ProductDetails />} />
      <Route path="/Checkout" element={<Checkout/>} />
      {(cart.sum != 0)? (
    <Route path="/cart" element={<Cart role={role} />} />
      ) : (
    <Route path="/cart" element={<p>The cart is empty</p>} />
    )}

      {/* {flag?<Route path="/cart" element={<Cart role={role}/>} />:<div><p>the cart empty</p></div>} */}

      {/* {flag&&<Route path="/cart" element={<Cart />} />} */}
      </Routes>
     
    {/* <Routes>
        <Route path = "/" element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/Signup" element={<SignUp />} />


    </Routes> */}
     
   
    {/* <SighnUp/> */}
    {/* <Checkout/> 
   <Login/>
    <AddProduct/> */}
 
    
     {/* <ProductList/>
    <ProductDetails/> */}
     </>
      
  )
 
}

export default App
