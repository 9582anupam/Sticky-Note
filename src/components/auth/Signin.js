// Signin.js
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

const StyledForm = styled('form')(({ theme }) => ({
    width: "100%",
    marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("Success to sign in");
            navigate('/dashboard');

        } catch (error) {
            console.error("Error signing in:", error.message);
            alert("Error signing in: " + error.message);
        }
    };

    return (
        <div className="bg-[#121212] h-full">
            <Container component="main" maxWidth="xs">
                <StyledPaper elevation={3}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
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
                        />
                        <SubmitButton
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary">
                            Sign In
                        </SubmitButton>
                        <Box mt={2}>
                            <Typography variant="body2">
                                Don't have an account? <Link to="/signup">Sign Up</Link>
                            </Typography>
                        </Box>
                    </StyledForm>
                </StyledPaper>
            </Container>
        </div>
    );
};

export default Signin;
