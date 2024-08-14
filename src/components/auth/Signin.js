import React, { useState } from "react";
import {
    Container,
    TextField,
    Button,
    Typography,
    Box,
    Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../../services/firebase"; // Import Firebase functions

// Define custom styles using styled API
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
        setIsSubmitted(true); // Set to true when form is submitted
        setEmailError(""); // Clear previous email errors
        setGeneralError(""); // Clear previous general errors
        setError(""); // Clear previous error message

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Success to sign in");
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
            <Container component="main" maxWidth="xs">
                <StyledPaper elevation={3}>
                    <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ fontWeight: "bold" }}>
                        Sign in
                    </Typography>

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
                                <Link to="/signup">Sign Up</Link>
                            </Typography>
                        </Box>
                    </StyledForm>
                </StyledPaper>
            </Container>
        </div>
    );
};

export default Signin;
