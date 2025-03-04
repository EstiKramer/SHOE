
import { Form, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addUser, login } from "../api/UserServicce"
import { userIn } from "../../features/userSlice"
import { current } from "@reduxjs/toolkit"
import { store } from "../../app/Store"
const Login = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { register, handleSubmit, formState:{ errors } } = useForm()

    const saveRegister = (data) => {
        console.log("Sending data to login:", data);
        login(data.email, data.password).then(res =>{
            alert("Login successful:", res.data);
            dispatch(userIn(res.data))
            // navigate("/list")
        }).catch(err => {
            console.log(err)
            alert("eeerrr")
        })

    }
    return (<form onSubmit={handleSubmit(saveRegister)}>
<input type="text" {...register("email",{required:{value:true,message:"email is required"}})} />
<input type="text" {...register("password",{required:{value:true,message:"password is required"}})} />
    <input type="submit" /></form>)
}
export default Login;