import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
// pages & components
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token")) || false
  );
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated}/>
        <div className="pages">
          <Routes>
            <Route path="/" element={isAuthenticated ? 
                  <Home /> : 
                  <Navigate to="/login" />
            }/>
            <Route path="/login" element={isAuthenticated ? (
                  <Navigate to="/" />) : (
                  <Login setIsAuthenticated={setIsAuthenticated} />)
            }/>
            <Route path="/signup" element={isAuthenticated ? (
                  <Navigate to="/" />) : (
                  <Signup setIsAuthenticated={setIsAuthenticated} />)
            }/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
