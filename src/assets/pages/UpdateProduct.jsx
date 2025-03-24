import { useFieldArray, useForm } from "react-hook-form";
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, Grid2 } from '@mui/material';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {useNavigate, useParams } from "react-router-dom";


import { Update } from "../api/ShoesService";
import { AddProductDetails } from "../api/ShoesService";
import { GetProductByID } from "../api/ShoesService";



const UpdateProduct = () => {
  const token = useSelector((state)=>state.user.token)

   const [details, setDetails] = useState(null)
      let {id} = useParams();
  
      useEffect(()=>{
          if(id){
          GetProductByID(id).then((res)=>{
            res.data.DateOfManufacture = res.data.DateOfManufacture.split("T")[0];
            setDetails(res.data);
              reset(res.data);
          }).catch(err=> {
              console.error("Error fetching product:", err);
          });}    
      },[id]);
  

  
  let { register, handleSubmit, formState: { errors }, control, reset} = useForm();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const saveRegister = async (data) => {
    alert("aaaa")
    console.log("Product Data:", data);
   
    try{
        const res = await Update(data, token)
        alert("Product updated successfully!");
        reset();
    }catch(err){
        alert(`Error: ${err.response?.data?.title || "Unknown Error"}\n\nDetails: ${err.response?.data?.message || err.message}`);
        console.log(err)
    }
  
  };

 

  return (
    <form onSubmit={handleSubmit(saveRegister)}>
      <Grid container spacing={3} sx={{mt:0}}>
        <Grid item xs={12}>
          <FormLabel htmlFor="productName">Name</FormLabel>
          <OutlinedInput
            id="productName"
            {...register("productName", { required: { value: true, message: "name is required" } })}
            name="productName"
            type="text"
            placeholder="Nike Air Force"
            size="small"
            // defaultValue={product?.productName || ""}
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
          <FormLabel htmlFor="price">Price</FormLabel>
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
          <FormLabel htmlFor="type">Type</FormLabel>
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
  );
};

export default UpdateProduct;
