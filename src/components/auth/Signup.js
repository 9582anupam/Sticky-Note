// Signup.js
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
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("success to signup");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error signing up:", error.message);
            alert("Error signing up: " + error.message);
        }
    };

    return (
        <div className="bg-[#121212] h-full">
            <Container component="main" maxWidth="xs">
                <StyledPaper elevation={3}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
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
                        />
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
