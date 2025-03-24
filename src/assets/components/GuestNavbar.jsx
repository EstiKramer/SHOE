
import { Link } from "react-router-dom";

const GuestNavbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/login">login</Link></li>
        <li><Link to="/Signup">sughnUp</Link></li>
        <li><Link to="/cart">cart</Link></li>
        <li><Link to="/list">list</Link></li>
      </ul>
    </nav>
  );
};

export default GuestNavbar;