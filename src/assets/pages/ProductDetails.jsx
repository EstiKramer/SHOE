import {useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';


import { GetProductByID, Delete } from "../api/ShoesService";
import "./ProductDetails.scss"


const ProductDetails=()=>{
    const token = useSelector((state)=>state.user.token)
    const role = useSelector((state)=>state.user.currentUser?.role)||"guest"

    const [details, setDetails] = useState(null)
    let {id} = useParams();
    let navigate = useNavigate();

    useEffect(()=>{
        if(id){
            console.log("the id:", id)
        GetProductByID(id).then((res)=>{
            setDetails(res.data);
        }).catch(err=> {
            console.error("Error fetching product:", err);
        });}    
    },[id]);

    if(!details){
        return<div>loading...</div>;
    }

    function deleteItem(id){
        if(id){
            console.log("id=", id)
            Delete(id, token).then((res)=>{
                console.log("res=", res)
                alert("the iten deleted")
            }).catch(err=> {
                console.error("Error fetching product:", err);
            });}    
    }

    
    return(<> <div className="product-details">
        <h1 className="product-name">{details.productName}</h1>
        <img className="product-image" src={details.imagePath} alt={details.productName} />
        <p className="product-description">{details.description}</p>
        <p className="product-date">Date of manufacture: {new Date(details.DateOfManufacture).toLocaleDateString()}</p>
        <p className="product-price">Price: {details.price} ₪</p>

        <h3>Available sizes:</h3>
            <ul className="product-sizes">
                {details.sizes.map((sizeObj, index) => (
                    <li key={index}>
                        size {sizeObj.size} - in stock: {sizeObj.stock}
                    </li>
                ))}
            </ul>

            <h3>Product Type:</h3>
            <p className="product-types">{details.type.join(", ")}</p>
            <button className="back-button" onClick={() => navigate(-1)}>חזרה</button>
            </div>
            
            {role=="admin"&&
            <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab sx={{ backgroundColor: "darkblue", color: "white" }} aria-label="edit"
            onClick={()=> navigate(`/updateProduct/${details._id}`)}>
                <EditIcon />
            </Fab>
            <Fab sx={{ backgroundColor: "red", color: "white" }} aria-label="delete"
            onClick={()=> deleteItem(details._id)}>
                <DeleteForeverRoundedIcon />
            </Fab>
            </Box>
            } 
            </>
    )
}
export default ProductDetails;