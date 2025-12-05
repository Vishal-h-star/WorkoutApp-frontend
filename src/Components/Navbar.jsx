import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="headerContainer">
        <Link to="/">
          <h1>Workout buddy</h1>
        </Link>
        <nav>
          {user && (
            <div className="userAndLogout">
              <span>{user.email}</span>
              <button className="btns" onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div className="logInoutDiv">
              
              <button className="btns">
                <Link to="/login">Login</Link>
              </button>

              <button className="btns">
                <Link to="/signup">Signup</Link>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
