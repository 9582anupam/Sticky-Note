import "./App.css";
import Navbar from "./components/ui/Navbar";
import Dashboard from "./components/ui/Dashboard";
import Signin from "./components/auth/Signin";
import Signup from "./components/auth/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Home from "./components/ui/Home";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

function App() {
    return (
        <Router>
            <ThemeProvider theme={darkTheme}>
                <div className="App text-center text-3xl h-svh">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/Signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/dashboard"
                            element={
                                <>
                                    <Navbar />
                                    <Dashboard />
                                </>
                            }
                        />
                    </Routes>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
