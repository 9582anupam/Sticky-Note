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
import { auth, createUserWithEmailAndPassword, updateProfile } from "../../services/firebase";
import "./input.css";
import { newUser } from "../../services/userService";

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

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(""); // General error message
    const [emailError, setEmailError] = useState(""); // Email-specific error
    const [passwordError, setPasswordError] = useState(""); // Password-specific error
    const [isSubmitted, setIsSubmitted] = useState(false); // Track submission
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitted(true); // Set to true when form is submitted
        setError(""); // Clear previous general errors
        setEmailError(""); // Clear previous email-specific errors
        setPasswordError(""); // Clear previous password-specific errors

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters long");
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(cred.user, {
                displayName: name
            });
            cred.user.password = password;
            newUser(cred);
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing up:", error.message);
            if (error.message.includes("(auth/invalid-email)")) {
                setEmailError("Invalid Email Address");
            } else if (error.message.includes("(auth/email-already-in-use)")) {
                setEmailError("Email is already in use");
            } else if (error.message.includes("(auth/weak-password)")) {
                setPasswordError("Password must be at least 6 characters long");
            } else {
                setError("Something went wrong, contact the developer");
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
                        Sign Up
                    </Typography>
                    <StyledForm noValidate onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
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
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={isSubmitted && !!passwordError}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            id="confirmPassword"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={isSubmitted && !!passwordError}
                            helperText={isSubmitted && passwordError}
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
                            Sign Up
                        </SubmitButton>
                        <Box mt={2}>
                            <Typography variant="body2">
                                Already have an account?{" "}
                                <Link to="/Signin">Sign In</Link>
                            </Typography>
                        </Box>
                    </StyledForm>
                </StyledPaper>
            </Container>
        </div>
    );
};

export default Signup;
