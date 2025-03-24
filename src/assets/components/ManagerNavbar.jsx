import { Link } from "react-router-dom";

const ManagerNavbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/list">list</Link></li>
        <li><Link to="/AddProduct">add product</Link></li>
      </ul>
    </nav>
  );
};

export default ManagerNavbar;