import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import {userOut} from "../../features/userSlice"
import { clearCart } from "../../features/cartSlice";

const ManagerNavbar = () => {
  const dispatch = useDispatch()

  function Logout(){
    
    dispatch(userOut());  
    dispatch(clearCart());
    
  }
  return (
    <nav>
      <ul>
        <li><Link to="/list">list</Link></li>
        <li><Link to="/AddProduct">add product</Link></li>
        <li><button onClick={()=>Logout()}>LogOut</button></li>

      </ul>
    </nav>
  );
};

export default ManagerNavbar;