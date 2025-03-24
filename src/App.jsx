import { useState } from 'react'
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


function App() {
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
function changec(c){
  setc(c);
}

  return (
    <>
    {c=="guest"&&<GuestNavbar />}
    {c=="user"&&<UserNavbar />}
    {c=="admin"&&<ManagerNavbar />} 
    <Routes>
      <Route path="/Login" element={<Login changec = {changec}/>} />
      <Route path="/Signup" element={ <SignUp changec = {changec}/>} />
      <Route path="/list" element={ <ProductList changeflag={changeflag}/>} />
      <Route path="/addProduct" element={ <AddProduct />} />
      <Route path="/updateProduct/:id" element={ <UpdateProduct/>} />
      <Route path="/list/product/:id" element={<ProductDetails />} />
      <Route path="/Checkout" element={<Checkout/>} />

      {flag?<Route path="/cart" element={<Cart c={c}/>} />:<div><p>the cart empty</p></div>}

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
