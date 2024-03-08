import { Link, useNavigate } from "react-router-dom";
import { useState} from "react";

const Navbar = ({isAuthenticated, setIsAuthenticated}) => {
  const navigate=useNavigate();
  //const [flag, setFlag] = useState(Boolean(localStorage.getItem("token"))||false);

  const handleClick= (e)=>{
    setIsAuthenticated(false)
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login")
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {isAuthenticated && (
            <div>
              <span>{JSON.parse(localStorage.getItem("user")).email}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!isAuthenticated && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;