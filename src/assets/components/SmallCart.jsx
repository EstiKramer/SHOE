import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

const SmallCart = ({ changeOnClose, onclose }) => {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.arr);
    const totalAmount = useSelector((state) => state.cart.sum);
    const itemCount = useSelector((state) => state.cart.count);

    useEffect(() => {
        const timer = setTimeout(() => {
            changeOnClose(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onclose, changeOnClose]);

    const handleClick = () => {
        navigate('/cart');
        changeOnClose(false);
    };

    return (
        <Fade in={true}>
            <Paper
                elevation={6}
                sx={{
                    position: "fixed",
                    top: "80px",
                    right: "20px",
                    width: "300px",
                    maxHeight: "400px",
                    zIndex: 1500,
                    p: 2,
                    borderRadius: 2,
                    overflow: "hidden",
                    cursor: "pointer",
                    bgcolor: "background.paper",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)"
                }}
                onClick={handleClick}
            >
                <Box sx={{ mb: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Typography variant="h6" component="h3" fontWeight="bold">
                        Added to Cart
                    </Typography>
                    <Badge badgeContent={itemCount} color="primary">
                        <ShoppingCartIcon color="action" />
                    </Badge>
                </Box>
                
                <Divider sx={{ mb: 2 }} />
                
                <Box sx={{ maxHeight: "250px", overflowY: "auto", mb: 2 }}>
                    <List sx={{ p: 0 }}>
                        {cartItems.slice(0, 3).map((item, index) => (
                            <ListItem key={index} alignItems="flex-start" sx={{ px: 0 }}>
                                <ListItemAvatar>
                                    <Avatar 
                                        alt={item.product.productName} 
                                        src={item.product.imagePath} 
                                        variant="rounded"
                                        sx={{ width: 50, height: 50 }}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.product.productName}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                ${item.product.price} × {item.qty}
                                            </Typography>
                                            {` — Size: ${item.size}`}
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                        
                        {cartItems.length > 3 && (
                            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                                + {cartItems.length - 3} more items
                            </Typography>
                        )}
                    </List>
                </Box>
                
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Total: ${totalAmount.toFixed(2)}
                    </Typography>
                    <Button variant="contained" color="primary" size="small">
                        View Cart
                    </Button>
                </Box>
            </Paper>
        </Fade>
    );
};

export default SmallCart;