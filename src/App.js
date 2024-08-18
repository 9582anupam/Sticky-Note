import "./App.css";
import Navbar from "./components/ui/Navbar";
import Dashboard from "./components/ui/Dashboard";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import Home from "./components/ui/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

// Create a dark theme
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    const [user, setUser] = useState(null);
    const auth = getAuth();

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            // setUser(1); // so that user can try app even without signing up
        });

        return () => unsubscribe(); // Clean up the listener on unmount
    }, [auth]);

    return (
        <Router>
            <ThemeProvider theme={darkTheme}>
                <div className="App text-center text-3xl h-svh">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/signin" element={user ? <Navigate to="/dashboard" /> : <Signin />} />
                        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup />} />
                        <Route
                            path="/dashboard"
                            element={user ? (
                                <>
                                    <Navbar />
                                    <Dashboard />
                                </>
                            ) : (
                                <Navigate to="/signin" />
                            )}
                        />
                        Redirect from any undefined route to home
                        <Route path="*" element={<Navigate to="/" />} />

                        {/* <Route path="/" element={<Home />} />       
                        <Route path="/dashboard" element={
                            (<>
                                <Navbar />
                                <Dashboard />
                            </>)
                        } />                        
                        <Route path="/signin" element={<Signin />} />                        
                        <Route path="/signup" element={<Signup />} />                         */}

                    </Routes>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
