import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { login } from "../api/UserServicce";
import { userIn } from "../../features/userSlice";
import "../styles/Auth.scss";

// MUI imports
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginIcon from '@mui/icons-material/Login';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("info");
    
    const { 
        register, 
        handleSubmit, 
        formState: { errors }
    } = useForm();

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = async (data) => {
        setLoading(true);
        
        try {
            console.log("Sending data to login:", data);
            const res = await login(data.email, data.password);
            
            console.log("API response:", res.data);
            const { token, user } = res.data;
            
            dispatch(userIn({ user, token }));
            localStorage.setItem("user", JSON.stringify(user));
            
            setSnackbarSeverity("success");
            setSnackbarMessage("Login successful");
            setSnackbarOpen(true);
            
            setTimeout(() => {
                navigate("/list");
            }, 1000);
            
        } catch (err) {
            console.error("Login error:", err);
            
            if (err.response && err.response.data) {
                const { message } = err.response.data;
                
                if (message === "wrong email") {
                    setSnackbarSeverity("warning");
                    setSnackbarMessage("User does not exist, redirecting to signup...");
                    setSnackbarOpen(true);
                    
                    setTimeout(() => {
                        navigate('/Signup');
                    }, 2000);
                    
                } else if (message === "wrong password") {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Incorrect password");
                    setSnackbarOpen(true);
                    
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Login failed: " + (message || "Unknown error"));
                    setSnackbarOpen(true);
                }
                
            } else {
                setSnackbarSeverity("error");
                setSnackbarMessage("Network error, please try again");
                setSnackbarOpen(true);
            }
            
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="sm" className="auth-container">
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Box className="auth-header">
                    <Typography variant="h4" component="h1" gutterBottom color="primary">
                        Login
                    </Typography>
                    <Typography variant="body1" className="auth-subtitle">
                        Enter your credentials to access your account
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    <Box className="form-group">
                        <TextField
                            fullWidth
                            id="email"
                            label="Email"
                            variant="outlined"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                    </Box>

                    <Box className="form-group">
                        <TextField
                            fullWidth
                            id="password"
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handlePasswordVisibility}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                        />
                    </Box>

                    <Box className="auth-actions">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="large"
                            fullWidth
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </Box>

                    <Box className="redirect-link">
                        <Typography variant="body2">
                            Don't have an account?{" "}
                            <Link to="/Signup">
                                Sign up
                            </Link>
                        </Typography>
                    </Box>
                </form>
            </Paper>
            
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert 
                    onClose={handleSnackbarClose} 
                    severity={snackbarSeverity} 
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Login;