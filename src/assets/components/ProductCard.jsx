
import "./ProductCard.scss";
import { useDispatch } from "react-redux";
import { addToCart, reduceFromCart, removeFromCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ productt }) => {
  const navigate = useNavigate();
  const {product, qty, size} = productt
  const dispatch = useDispatch()
  const {
    productName,
    description,
    DateOfManufacture,
    imagePath,
    price,
    stock,
  } = product;

  const totalPrice = price * qty;

  return (
    <div className="product-card">
      <img src={imagePath} alt={productName} className="product-image" />
      <h2 className="product-title">{productName}</h2>
      <p className="product-description">{description}</p>
      <p className="product-date">
        Manufactured: {new Date(DateOfManufacture).toLocaleDateString()}
      </p>
      <div className="product-details">
        <p className="product-price">${price} per unit</p>
        <p className="product-size">Size: {size}</p>
        {/* <p className="product-stock">Stock: {stock}</p> */}
        <p className="product-quantity">Quantity: {qty}</p>
        <p className="product-total">Total: ${totalPrice}</p>
        <button onClick={()=>{dispatch(addToCart({product:product,size:size}))}}>+</button>
        <button onClick={()=>{dispatch(reduceFromCart({product:product,qty:qty}))}}>-</button>
        <button onClick={()=>{dispatch(removeFromCart(productt))}}>delete</button>
      </div>
      {/* <button onClick={()=>{navigate('/Checkout')}}>Checkout</button> */}

    </div>
  );
};

export default ProductCard;
