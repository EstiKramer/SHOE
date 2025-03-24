import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/cart">cart</Link></li>
        <li><Link to="/list">list</Link></li>
        <li><Link to="/updateProduct">updateProduct</Link></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;