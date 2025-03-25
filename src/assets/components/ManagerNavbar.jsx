import { Link } from "react-router-dom";

const ManagerNavbar = () => {

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