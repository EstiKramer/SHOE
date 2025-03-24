
import { Form, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';



import { addUser, login } from "../api/UserServicce"
import { userIn } from "../../features/userSlice"

const Login = ({changec}) => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    let { register, handleSubmit, formState:{ errors } } = useForm()

    const saveRegister = (data) => {
        console.log("Sending data to login:", data);
        login(data.email, data.password).then(res =>{
            console.log("API response:", res.data); // כאן תוודא שהנתונים נכונים

            const { token, user } = res.data;
            console.log("🔹 Login request received:", res.data);
            dispatch(userIn({ user, token }))
            changec(user.role)
            setSnackbarMessage("Login successful")
            setSnackbarOpen(true);
            navigate("/list")
        }).catch(err => {
            if(err.response && err.response.data && err.response.data.message === "wrong email"){
                setSnackbarMessage("User is not exists, you are sending to signup")
                setSnackbarOpen(true);
                setTimeout(() => {
                    console.log("Navigating to login...");
                    navigate('/Signup');
                }, 2000);
                return;} 
                if(err.response && err.response.data && err.response.data.message === "wrong password"){
                    setSnackbarMessage("wrong password")
                    setSnackbarOpen(true);
                }
                setSnackbarMessage("An error occurred");
                setSnackbarOpen(true);
        })
    }
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };
    return (<><form onSubmit={handleSubmit(saveRegister)}>
<input type="text" placeholder="email"{...register("email",{required:{value:true,message:"email is required"}})} />
<input type="text" placeholder="password" {...register("password",{required:{value:true,message:"password is required"}})} />
    <input type="submit" /></form>
      <div>
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        TransitionComponent={Slide}
        message={snackbarMessage}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
        </div></>)
}
export default Login;