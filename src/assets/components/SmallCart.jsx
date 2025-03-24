import { useEffect } from "react";
import Cart from "../pages/Cart";
import { useSelector } from "react-redux";

const SmallCart = ({changeOnClose, onclose}) => {
    const arr = useSelector((state)=>state.cart.arr);
    const sum = useSelector((state)=>state.cart.sum);
    const cnt = useSelector((state)=>state.cart.count);

    useEffect(() => {
        const timer = setTimeout(() => {
            changeOnClose(false);
        }, 3000);
        return () => clearTimeout(timer)
    },[onclose])

return(<div style={styles.alertBox}>
 
   
        {arr.map((item,index)=>(<div key ={index}><img width="50" height="50" src={item.product.imagePath} alt={item.product.productName}/><p>{item.product.productName}</p></div>))}
<p>sum:{sum}  qty:{cnt}</p>
        </div>
)
}
const styles = {
    alertBox: {
      position: "fixed",
      top: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "#333",
      color: "white",
      padding: "15px",
      borderRadius: "5px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
      zIndex: 1000,
    },
  };
  export default SmallCart;
