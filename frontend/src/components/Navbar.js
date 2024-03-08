import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  const flag = false;
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Dashboard</h1>
        </Link>
        <nav>
          {flag && (
            <div>
              <span></span>
              <button onClick={()=>{
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/login")}
                }>Log out</button>
            </div>
          )}
          {!flag && (
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