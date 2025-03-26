import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { addUser } from "../api/UserServicce";
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
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CircularProgress from '@mui/material/CircularProgress';

const SignUp = () => {
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

    const onSubmit = async (ddata) => {
        // console.log("Form submitted:", data);

        setLoading(true);
        
        try {
            console.log("aaa",ddata)
            const res = await addUser(ddata);
            console.log("Signup response:", res);
            
            const { token, data } = res.data;
            dispatch(userIn({ data, token }));
            
            setSnackbarSeverity("success");
            setSnackbarMessage("Account created successfully");
            setSnackbarOpen(true);
            
            setTimeout(() => {
                navigate("/list");
            }, 1500);
            
        } catch (err) {
            console.error("Signup error:", err);
            
            if (err.response && err.response.data) {
                const { title } = err.response.data;
                
                if (title === "User already exists") {
                    setSnackbarSeverity("info");
                    setSnackbarMessage("User already exists, redirecting to login...");
                    setSnackbarOpen(true);
                    
                    setTimeout(() => {
                        navigate('/Login');
                    }, 2000);
                    
                } else {
                    setSnackbarSeverity("error");
                    setSnackbarMessage("Signup failed: " + (title || "Unknown error"));
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
                        Sign Up
                    </Typography>
                    <Typography variant="body1" className="auth-subtitle">
                        Create a new account to start shopping
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                    <Box className="form-group">
                        <TextField
                            fullWidth
                            id="username"
                            label="Username"
                            variant="outlined"
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters"
                                }
                            })}
                        />
                    </Box>

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
                            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </Button>
                    </Box>

                    <Box className="redirect-link">
                        <Typography variant="body2">
                            Already have an account?{" "}
                            <Link to="/Login">
                                Login
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

export default SignUp;