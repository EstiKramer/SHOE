
import { Form, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';

import { addUser } from "../api/UserServicce"
import { userIn } from "../../features/userSlice"

const SignUp = () => {
    let dispatch = useDispatch()
    let navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    let { register, handleSubmit, formState:{ errors } } = useForm()


    const saveRegister = (data) => {
        addUser(data).then(res =>{
            const { token, user } = res.data;
            dispatch(userIn({  user, token }))
            navigate("/list")
            alert("נוסף בהצלחה")
        }).catch(err => {
            if(err.response && err.response.data && err.response.data.title === "User already exists"){
                setSnackbarMessage("User already exists, , you are sending to Login")
                setSnackbarOpen(true)
                setTimeout(() => {
                    console.log("Navigating to login...");
                    navigate('/Login');
                }, 2000);
            return;}
            // console.error("שגיאה בתשובה:", err);
            setSnackbarMessage("There was an error, please try again.");
            setSnackbarOpen(true);
            alert(err)
        })

    }
    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (<><form onSubmit={handleSubmit(saveRegister)}>
<input type="text" placeholder="name" {...register("userName",{required:{value:true,message:"username is required"}})} />
{errors.userName && <span>{errors.userName.message}</span>}

<input type="text" placeholder="password" {...register("password",{required:{value:true,message:"password is required"}})} />
{errors.password && <span>{errors.password.message}</span>}

<input type="text"  placeholder="email" {...register("email",{required:{value:true,message:"email is required"}})} />
{errors.email && <span>{errors.email.message}</span>}

    <input type="submit" /></form>

             <div>
          <Snackbar
            open={snackbarOpen}
            onClose={handleCloseSnackbar}
            TransitionComponent={Slide}
            message={snackbarMessage}
            // key={state.Transition.name}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
            </div></>)
    
}
export default SignUp;