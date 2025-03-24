import { useFieldArray, useForm } from "react-hook-form";
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Grid2 } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import Grow from '@mui/material/Grow';
import { useSelector} from "react-redux";
import { useState, useEffect } from "react";

import { AddProductDetails } from "../api/ShoesService";
import {  useNavigate } from "react-router-dom";


const AddProduct = () => {
    const token = useSelector((state)=>state.user.token)
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");


    useEffect(() => {
      if (!token) {
        setSnackbarMessage("User not logged in, redirecting to signup page...");
        setSnackbarOpen(true);
        // Redirect to signup immediately
        setTimeout(() => {
          navigate('/Login', { replace: true })// Make sure this route exists in your App.js
        }, 2000);
      }
    }, [token, navigate]);
 

  
  let { register, handleSubmit, formState: { errors }, control, reset} = useForm({
    defaultValues: {
      productName: "",
      price: "",
      description: "",
      imagePath: "",
      sizes: [{ size: "", stock: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });



 
  const saveRegister = async (data) => {
    alert("aaaa")
    console.log("🔹 Token being sent:", token);
    console.log("🔹 Sending request with data:", data);
    try{
        const res = await AddProductDetails(data, token)
        console.log("🔹 Server response data:", res.data);
        setSnackbarMessage("Product added successfully!");
        setSnackbarOpen(true);
        // alert("Product added successfully!");
        reset();
    }catch(err){
      if(err.message=="No token provided" || token==null){
        setSnackbarMessage("User not logged in")
        setSnackbarOpen(true);
        setTimeout(() => {
          console.log("Navigating to login...");
          navigate('/Login');
      }, 3000);
        // console.log("Navigating to login...");
        // navigate('/Login');
        return}
        setSnackbarMessage(`Error: ${err.response?.data?.title || "Unknown Error"}\n\nDetails: ${err.response?.data?.message || err.message}`);
        setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
};

 

  return (<>
    <form onSubmit={handleSubmit(saveRegister)}>
      <Grid container spacing={3} sx={{mt:0}}>
        <Grid item xs={12}>
          <FormLabel htmlFor="productName" required>Name</FormLabel>
          <OutlinedInput
            id="productName"
            {...register("productName", { required: { value: true, message: "name is required" } })}
            name="productName"
            type="text"
            placeholder="Nike Air Force"
            required
            size="small"
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormLabel htmlFor="description" required>Description</FormLabel>
          <OutlinedInput
            id="description"
            {...register("description", { required: { value: true, message: "description is required" } })}
            name="description"
            type="text"
            placeholder="description"
            required
            size="small"
          />
        </Grid>

        <Grid item xs={6}>
          <FormLabel htmlFor="DateOfManufacture" required>Date of Manufacture</FormLabel>
          <OutlinedInput
            id="DateOfManufacture"
            {...register("DateOfManufacture", { required: { value: true, message: "date is required" } })}
            name="DateOfManufacture"
            type="date"
            required
            size="small"
          />
        </Grid>

        <Grid item xs={6}>
          <FormLabel htmlFor="imagePath" required>Image Path</FormLabel>
          <OutlinedInput
            id="imagePath"
            {...register("imagePath", { required: { value: true, message: "imagePath is required" } })}
            name="imagePath"
            type="text"
            required
            size="small"
          />
        </Grid>

        <Grid item xs={6}>
          <FormLabel htmlFor="price" required>Price</FormLabel>
          <OutlinedInput
            id="price"
            {...register("price", { required: { value: true, message: "price is required" }, valueAsNumber: true })}
            name="price"
            type="number"
            placeholder="price"
            required
            size="small"
          />
        </Grid>

       
        <Grid item xs={6}>
          <FormLabel htmlFor="type" required>Type</FormLabel>
          <OutlinedInput
            id="type"
            {...register("type", { required: { value: true, message: "type is required" } })}
            name="type"
            type="text"
            placeholder="type"
            required
            size="small"
          />
        </Grid>
       <Grid item xs={12}>
        <h3>Sizes & Stock</h3>
        {fields.map((item, index)=>(
            <Grid container spacing={2} key={index}>
                <Grid item xs={5}>
                    <TextField
                    label="Size"
                    {...register(`sizes[${index}].size`, {required:'Size is rquired'})}
                    fullWidth
                    />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                        label="Stock"
                        {...register(`sizes[${index}].stock`, {required:'Stock is required'})}
                        fullWidth
                        type="number"/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button color="error"
                        onClick={()=> remove(index)}>
                            <DeleteIcon/>
                        </Button>
                    </Grid>
                    </Grid>
        ))}
        <Button 
        variant="outlined"
        onClick={()=>append({size:'', stock:''})}>
            Add Size
        </Button>
       </Grid>
      
        <Button
          type="submit"
          variant="contained"
          sx={{ width: { xs: '100%', sm: 'fit-content' } }}
        >
          Place Order
        </Button>
        </Grid>

    </form>

         <div>
      <Snackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        TransitionComponent={Slide}
        message={snackbarMessage}
        // key={state.Transition.name}
        autoHideDuration={3000}
      />
        </div>
        </>
  );
};

export default AddProduct;
