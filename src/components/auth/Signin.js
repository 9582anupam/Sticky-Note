import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../services/firebase"; // Import Firebase functions
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 400,
    margin: "auto",
    marginTop: theme.spacing(8),
    textAlign: "center",
}));

const StyledForm = styled("form")(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [generalError, setGeneralError] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false); // New state to track submission
    const [error, setError] = useState(""); // General error message
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true);
        setEmailError("");
        setGeneralError("");
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            0("Success to sign in");
            localStorage.setItem("loggedIn", true);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing in:", error.message);
            if (error.message.includes("(auth/invalid-email)")) {
                setEmailError("Invalid Email");
                setError("");
                setGeneralError("");
            } else if (error.message.includes("(auth/invalid-credential)")) {
                setGeneralError("Incorrect email or password");
                setError("");
                setEmailError("");
            } else {
                setError("Something went wrong, contact the developer");
                setGeneralError("");
                setEmailError("");
            }
        }
    };

    return (
        <div className="bg-[#121212] h-full">
            <Container component="main" maxWidth="xs" className="relative">
                <StyledPaper elevation={3}>
                    <div className="flex items-center">
                        <IconButton
                            onClick={() => navigate("/")}
                            color="inherit"
                            size="small"
                            sx={{ position: "absolute", left: "2rem" }}>
                            <ArrowBackIcon sx={{height: "35px", width: "35px"}}/>
                        </IconButton>
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{ fontWeight: "bold", margin: "0 auto" }}>
                            Sign in
                        </Typography>
                    </div>

                    <StyledForm noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={isSubmitted && !!emailError}
                            helperText={isSubmitted && emailError}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={isSubmitted && !!generalError}
                            helperText={isSubmitted && generalError}
                        />
                        {error && (
                            <Typography
                                color="error"
                                variant="body2"
                                align="center">
                                {error}
                            </Typography>
                        )}
                        <SubmitButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            Sign In
                        </SubmitButton>
                        <Box mt={2}>
                            <Typography variant="body2">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-[#00aaff] text-lg">Sign Up</Link>
                            </Typography>
                        </Box>
                    </StyledForm>
                </StyledPaper>
            </Container>
        </div>
    );
};

export default Signin;
