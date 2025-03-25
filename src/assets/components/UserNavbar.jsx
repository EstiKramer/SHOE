import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userOut } from "../../features/userSlice";
import { clearCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function Logout(){
    dispatch(userOut());  
    dispatch(clearCart());
  }
  return (
    <nav>
      <ul>
        <li><Link to="/cart">cart</Link></li>
        <li><Link to="/list">list</Link></li>
        <li><button onClick={()=>{Logout()
          navigate('List')
        }}>LogOut</button></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;