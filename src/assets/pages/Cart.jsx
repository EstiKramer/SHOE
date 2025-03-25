
import { useSelector } from "react-redux";
import ProductCard from '../components/ProductCard'
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Cart = () =>{
    const navigate = useNavigate();
    const arr = useSelector((state)=>state.cart.arr);
    const role = useSelector((state)=>state.user.currentUser?.role)||"guest"


    return(<>
    <div>
        {arr.map((item,index)=>(<div key ={index}><ProductCard productt={item}/></div>))}
        </div>
        <button onClick={()=>{
            if(role=="guest"){
                alert("you need login")
            navigate('/Login')}
        else if(role=="user"){
            navigate('/Checkout')
        }}}>Checkout</button>
        </>)
}
export default Cart;