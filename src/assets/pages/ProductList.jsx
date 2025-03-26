import { useEffect, useState } from "react";
import { GetAllProducts } from "../api/ShoesService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cartSlice";
import OneProduct from "../components/OneProduct";
import SmallCart from "../components/SmallCart";
import "./ProductList.scss";

// MUI imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

const ProductList = ({ changeflag }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [cartNotification, setCartNotification] = useState(false);
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = async (page) => {
        setLoading(true);
        try {
            const response = await GetAllProducts(page);
            setProducts(response.data.data);
            setTotalPages(parseInt(response.data.totalPages));
            setError(null);
        } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        window.scrollTo(0, 0);
    };

    const handleSizeSelect = (productId, size) => {
        setSelectedSizes({
            ...selectedSizes,
            [productId]: size
        });
    };

    const handleAddToCart = (product) => {
        const selectedSize = selectedSizes[product._id];
        
        if (!selectedSize) {
            setSnackbarMessage("Please select a size first");
            setSnackbarOpen(true);
            return;
        }

        const sizeDetails = product.sizes.find(s => s.size === selectedSize);
        
        if (!sizeDetails || sizeDetails.stock <= 0) {
            setSnackbarMessage("Selected size is out of stock");
            setSnackbarOpen(true);
            return;
        }

        dispatch(addToCart({ product, size: selectedSize }));
        changeflag(true);
        setCartNotification(true);
        setSnackbarMessage(`Added ${product.productName} to cart`);
        setSnackbarOpen(true);
    };

    const handleQuickView = (product, event) => {
        event.stopPropagation();
        setScrollPosition(window.scrollY);
        setSelectedProduct(product);
    };

    const handleProductClick = (productId) => {
        navigate(`product/${productId}`);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    if (loading && products.length === 0) {
        return (
            <Container className="product-list-container">
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="product-list-container">
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="product-list-container">
            {cartNotification && <SmallCart changeOnClose={(flag) => setCartNotification(flag)} onClose={cartNotification} />}
            
            <Grid container spacing={3} className="product-grid">
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card 
                            className="product-item" 
                            elevation={3}
                            onClick={() => handleProductClick(product._id)}
                        >
                            <CardMedia
                                component="img"
                                className="product-image"
                                image={product.imagePath}
                                alt={product.productName}
                            />
                            
                            <CardContent className="product-info">
                                <Typography variant="h6" className="product-name">
                                    {product.productName}
                                </Typography>
                                
                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {product.description.length > 100 
                                        ? `${product.description.substring(0, 100)}...` 
                                        : product.description}
                                </Typography>
                                
                                <Typography variant="subtitle1" className="product-price">
                                    ${product.price}
                                </Typography>
                                
                                <Box className="sizes-container">
                                    {product.sizes && product.sizes.map((size) => (
                                        <Chip
                                            key={`${product._id}-${size.size}`}
                                            label={size.size}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSizeSelect(product._id, size.size);
                                            }}
                                            color={selectedSizes[product._id] === size.size ? "primary" : "default"}
                                            variant={selectedSizes[product._id] === size.size ? "filled" : "outlined"}
                                            size="small"
                                            disabled={size.stock <= 0}
                                        />
                                    ))}
                                </Box>
                                
                                <Box className="actions-container">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddShoppingCartIcon />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddToCart(product);
                                        }}
                                        size="small"
                                    >
                                        Add to Cart
                                    </Button>
                                    
                                    <IconButton
                                        className="quick-view-btn"
                                        onClick={(e) => handleQuickView(product, e)}
                                        size="small"
                                        color="primary"
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination 
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    showFirstButton
                    showLastButton
                />
            </Box>
            
            {selectedProduct && (
                <OneProduct 
                    product={selectedProduct} 
                    scrollPosition={scrollPosition} 
                    onClose={() => setSelectedProduct(null)} 
                />
            )}
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default ProductList;