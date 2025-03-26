import "./ProductCard.scss";
import { useDispatch } from "react-redux";
import { addToCart, reduceFromCart, removeFromCart } from "../../features/cartSlice";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';

const ProductCard = ({ productt }) => {
  const navigate = useNavigate();
  const { product, qty, size } = productt;
  const dispatch = useDispatch();
  const {
    _id,
    productName,
    description,
    DateOfManufacture,
    imagePath,
    price,
  } = product;

  const totalPrice = price * qty;

  const handleAddToCart = () => {
    dispatch(addToCart({product: product, size: size}));
  };

  const handleReduceFromCart = () => {
    dispatch(reduceFromCart({product: product, qty: qty, size: size}));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(productt));
  };

  return (
    <Card className="product-card" elevation={3}>
      <CardMedia
        component="img"
        image={imagePath}
        alt={productName}
        className="product-image"
      />
      <CardContent>
        <Typography variant="h5" component="h2" className="product-title" gutterBottom>
          {productName}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" className="product-description">
          {description}
        </Typography>
        
        <Typography variant="caption" className="product-date">
          Manufactured: {new Date(DateOfManufacture).toLocaleDateString()}
        </Typography>
        
        <Divider sx={{ my: 2 }} />
        
        <Box className="product-details">
          {/* <Typography variant="body1" className="product-price">
            ${price} per unit
          </Typography> */}
          
          <Chip 
            label={`Size: ${size}`}
            variant="outlined" 
            size="small" 
            className="product-size"
          />
          
          <Typography variant="body2" className="product-quantity">
            Quantity: {qty}
          </Typography>
          
          <Typography variant="body1" className="product-total">
            Total: ${totalPrice}
          </Typography>
          
          <ButtonGroup variant="contained" aria-label="cart actions" sx={{ mt: 2 }}>
            <Button 
              onClick={handleAddToCart}
              color="primary"
              startIcon={<AddIcon />}
            >
              Add
            </Button>
            
            <Button
              onClick={handleReduceFromCart}
              color="warning"
              startIcon={<RemoveIcon />}
            >
              Remove
            </Button>
            
            <Button
              onClick={handleRemoveFromCart}
              color="error"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </ButtonGroup>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;