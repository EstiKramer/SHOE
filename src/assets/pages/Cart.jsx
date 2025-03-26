import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from '../components/ProductCard';
import "./Cart.scss";

// MUI imports
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';

const Cart = () => {
    const navigate = useNavigate();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    
    const cartItems = useSelector((state) => state.cart.arr);
    const totalAmount = useSelector((state) => state.cart.sum);
    const itemCount = useSelector((state) => state.cart.count);
    const role = useSelector((state) => state.user.currentUser?.role) || "guest";
    
    const handleCheckout = () => {
        console.log(role)
        if (role === "guest") {
            setSnackbarMessage("You need to login first");
            setSnackbarOpen(true);
            setTimeout(() => {
                navigate('/Login');
            }, 1500);
        } else if (role === "user") {
            navigate('/Checkout');
        }
    };
    
    const handleContinueShopping = () => {
        navigate('/list');
    };
    
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    
    // Empty cart view
    if (cartItems.length === 0) {
        return (
            <Container className="cart-container">
                <Box className="cart-empty" mt={4}>
                    <ShoppingCartIcon className="empty-icon" sx={{ fontSize: 80, color: 'text.disabled' }} />
                    <Typography variant="h4" gutterBottom>
                        Your cart is empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Looks like you haven't added any items to your cart yet.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingBagIcon />}
                        onClick={handleContinueShopping}
                        size="large"
                    >
                        Continue Shopping
                    </Button>
                </Box>
            </Container>
        );
    }
    
    return (
        <Container className="cart-container">
            <Box className="cart-header" mb={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Your Shopping Cart
                </Typography>
                <Typography variant="body1" className="cart-summary">
                    You have {itemCount} item{itemCount !== 1 ? 's' : ''} in your cart
                </Typography>
            </Box>
            
            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Box className="cart-items">
                        {cartItems.map((item, index) => (
                            <ProductCard key={`${item.product._id}-${item.size}-${index}`} productt={item} />
                        ))}
                    </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} className="cart-footer">
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        
                        <Box className="cart-totals">
                            <Box className="total-row">
                                <Typography variant="body1">Subtotal:</Typography>
                                <Typography variant="body1">${totalAmount.toFixed(2)}</Typography>
                            </Box>
                            
                            <Box className="total-row">
                                <Typography variant="body1">Shipping:</Typography>
                                <Typography variant="body1">$25.00</Typography>
                            </Box>
                            
                            <Box className="total-row grand-total">
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6">${(totalAmount + 25).toFixed(2)}</Typography>
                            </Box>
                        </Box>
                        
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            onClick={handleCheckout}
                            className="checkout-button"
                        >
                            Proceed to Checkout
                        </Button>
                        
                        <Box mt={2}>
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIcon />}
                                fullWidth
                                onClick={handleContinueShopping}
                            >
                                Continue Shopping
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity="info" 
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Cart;