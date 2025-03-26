import "./OneProduct.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const OneProduct = ({ product, scrollPosition, onClose }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedSize, setSelectedSize] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const dispatch = useDispatch();

    const handleClose = () => {
        window.scrollTo(0, scrollPosition);
        onClose();
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSnackbarMessage("Please select a size first");
            setSnackbarSeverity("warning");
            setSnackbarOpen(true);
            return;
        }

        const sizeDetails = product.sizes.find(s => s.size === selectedSize);
        
        if (!sizeDetails || sizeDetails.stock <= 0) {
            setSnackbarMessage("Selected size is out of stock");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }

        dispatch(addToCart({ product, size: selectedSize }));
        setSnackbarMessage(`${product.productName} added to cart`);
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Dialog
                open={true}
                onClose={handleClose}
                fullScreen={fullScreen}
                fullWidth
                maxWidth="sm"
                aria-labelledby="product-dialog-title"
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }
                }}
            >
                <DialogTitle id="product-dialog-title" sx={{ pb: 1 }}>
                    <Typography variant="h5" component="div" align="center" fontWeight="bold">
                        {product.productName}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <Box 
                        sx={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            mb: 3,
                            height: 250
                        }}
                    >
                        <img 
                            src={product.imagePath} 
                            alt={product.productName} 
                            style={{ 
                                maxHeight: '100%', 
                                maxWidth: '100%', 
                                objectFit: 'contain' 
                            }} 
                        />
                    </Box>

                    <Typography variant="body1" gutterBottom sx={{ mb: 2 }}>
                        {product.description}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Date of manufacture: {new Date(product.DateOfManufacture).toLocaleDateString()}
                    </Typography>

                    <Typography 
                        variant="h6" 
                        color="primary" 
                        sx={{ my: 2, fontWeight: 'bold' }}
                    >
                        Price: ${product.price}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" gutterBottom>
                        Available sizes:
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                        {product.sizes && product.sizes.map((sizeObj, index) => (
                            <Chip
                                key={index}
                                label={`Size ${sizeObj.size} - Stock: ${sizeObj.stock}`}
                                onClick={() => handleSizeSelect(sizeObj.size)}
                                color={selectedSize === sizeObj.size ? "primary" : "default"}
                                variant={selectedSize === sizeObj.size ? "filled" : "outlined"}
                                disabled={sizeObj.stock <= 0}
                            />
                        ))}
                    </Box>

                    {product.type && (
                        <>
                            <Typography variant="subtitle1" gutterBottom>
                                Product Type:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                                {product.type.map((type, index) => (
                                    <Chip key={index} label={type} variant="outlined" />
                                ))}
                            </Box>
                        </>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                        <Button 
                            variant="outlined" 
                            onClick={handleClose}
                        >
                            Close
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddShoppingCartIcon />}
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            <Snackbar 
                open={snackbarOpen} 
                autoHideDuration={3000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity={snackbarSeverity} 
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default OneProduct;