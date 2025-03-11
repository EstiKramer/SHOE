import { useEffect, useState } from "react";
import { GetAllProducts } from "../api/ShoesService";

const ProductList = () => {
    let [arr, setArr] = useState([])
    let [totalPages, setTotalPages] = useState(2)
    let [currentPage, setCurrentPage] = useState(1)

    useEffect(()=>{
        GoToServer(currentPage)
    },[]);
    function GoToServer(index){
        GetAllProducts(index).then((res)=>{
            setArr(res.data)
        }).catch(err=>{console.log(err)})
    }

    let arrButtons = [];
    for (let i=0; i<totalPages;i++){
        arrButtons.push(<input type="button" value={i+1} onClick={()=>{
          setCurrentPage(i+1)  
          GoToServer(i+1)
        }}/>)
        return<dv>{arrButtons}
        <ul>
            {arr.map(item=><li key={item._id}>{item.name} {<img src={item.imagePath}/>}</li>)}
        </ul>
        </dv>
    }
    return (  );
}
 
export default ProductList;