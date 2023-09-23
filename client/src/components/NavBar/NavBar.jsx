import { Link, Outlet } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>

      <div>
        <Outlet />
      </div>
    </>
  );
};

export default NavBar;
