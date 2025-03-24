// import { useEffect, useState } from "react";
// import { GetAllProducts } from "../api/ShoesService";
// import { useNavigate } from 'react-router-dom';
// import OneProduct from "../components/OneProduct"

// const ProductList = ({changeflag}) => {
//     let [arr, setArr] = useState([])
//     let [totalPages, setTotalPages] = useState(2)
//     let [currentPage, setCurrentPage] = useState(1)
//     let [hoverProduct, setHoverProduct] = useState(null)
//     const [scrollPosition, setScrollPosition] = useState(0)
//     const [selectedItem, setSelectedItem] = useState(null)
//     const navigate = useNavigate();


//     useEffect(()=>{
//         GoToServer(currentPage)
//     },[currentPage]);
    
//     function GoToServer(index){
//         GetAllProducts(index).then((res)=>{
//             setArr(res.data.data)
//             setTotalPages(parseInt(res.data.totalPages))
//         }).catch(err=>{console.log(err)})
//     }

//     let arrButtons = [];
//     for (let i=0; i<totalPages;i++){
//         arrButtons.push(<input type="button"value={i+1} onClick={()=>{
//           setCurrentPage(i+1)  
//           GoToServer(i+1)
//         }}/>)}

//     return(<div>
//         <ul>
//             {arr.map(item=><li  key={item._id}
//             onClick={() => {navigate(`product/${item._id}`)}}
//             onMouseEnter={()=>setHoverProduct(item)}
//             onMouseLeave={()=>setHoverProduct(null)}
//              style={{ cursor: "pointer", position: "relative" }}> {item.productName} 
//              <img style={{width:"60px", height:"60px"}}src={`./public${item.imagePath}` }/>
//              {hoverProduct===item &&(<button 
//              onClick={(e)=> { 
//                 e.stopPropagation();
//                 setScrollPosition(window.scrollY)
//                 setSelectedItem(item)}}
//                 style={{
//                     position: "absolute",
//                     bottom: "10px",
//                     right: "10px",
//                     backgroundColor: "rgba(0, 0, 0, 0.7)",
//                     color: "white",
//                     border: "none",
//                     padding: "5px 10px",
//                     borderRadius: "5px",
//                   }}>
//                     תצוגה מהירה
//                 </button>)}
//                 </li>)}
//         </ul>
//         {arrButtons}
//         {selectedItem && <OneProduct product={selectedItem} scrollPosition={scrollPosition} onClose={()=>setSelectedItem(null)}/>}

//         </div>)
    

// }
 
// export default ProductList;
import { useEffect, useState } from "react";
import { GetAllProducts } from "../api/ShoesService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice"
import OneProduct from "../components/OneProduct";
import SmallCart from "../components/SmallCart";

const ProductList = ({ changeflag }) => {
    let [arr, setArr] = useState([]);
    let [totalPages, setTotalPages] = useState(2);
    let [currentPage, setCurrentPage] = useState(1);
    let [hoverProduct, setHoverProduct] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isDisabled, setIsDisabled] = useState(true);
    const [chosenSizeId, setChosenSizeId] = useState(0);
    const [chosenSize, setChosenSize] = useState(0);
    const [onClose, setOnClose] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        goToServer(currentPage);
    }, [currentPage]);

    function goToServer(index) {
        GetAllProducts(index)
            .then((res) => {
                setArr(res.data.data);
                setTotalPages(parseInt(res.data.totalPages));
            })
            .catch((err) => {
                console.log(err);
                alert("Error fetching products");
            });
    }

    function changeOnClose(flag) {
        setOnClose(flag);
    }

    let arrButtons = [];
    for (let i = 0; i < totalPages; i++) {
        arrButtons.push(
            <input
                key={i}
                type="button"
                value={i + 1}
                onClick={() => setCurrentPage(i + 1)}
            />
        );
    }

    return (
        <div>
            {onClose && <SmallCart changeOnClose={changeOnClose} onClose={onClose} />}
            <ul>
                {arr.map((item) => (
                    <li
                        key={item._id}
                        onClick={() => navigate(`product/${item._id}`)}
                        onMouseEnter={() => setHoverProduct(item)}
                        onMouseLeave={() => setHoverProduct(null)}
                        style={{ cursor: "pointer", position: "relative" }}
                    >
                        {item.productName}
                        <img style={{ width: "60px", height: "60px" }} src={`./public${item.imagePath}`} />

                        {item.sizes && (
                            <div>
                                {item.sizes.map((size) => (
                                    <button
                                        key={`${item._id}-${size.size}`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setChosenSizeId(size._id);
                                            setChosenSize(size.size);
                                        }}
                                    >
                                        {size.size}
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                const index = item.sizes.findIndex((s) => s._id === chosenSizeId);
                                if (index < 0) {
                                    alert("Choose a size");
                                } else {
                                    dispatch(addToCart({ product: item, size: chosenSize }));
                                    changeflag(true);
                                    setOnClose(true);
                                }
                                setChosenSize(0);
                            }}
                        >
                            Add to cart
                        </button>

                        {hoverProduct === item && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setScrollPosition(window.scrollY);
                                    setSelectedItem(item);
                                }}
                                style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    right: "10px",
                                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                                    color: "white",
                                    border: "none",
                                    padding: "5px 10px",
                                    borderRadius: "5px",
                                }}
                            >
                                תצוגה מהירה
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            <div>{arrButtons}</div>
            {selectedItem && <OneProduct product={selectedItem} scrollPosition={scrollPosition} onClose={() => setSelectedItem(null)} />}
        </div>
    );
};

export default ProductList;