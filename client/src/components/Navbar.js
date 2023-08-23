import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const NavBar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      navigate('/');
    } else {
      navigate('/signin');
    }
  }, []);

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={user ? "/" : "/signin"} className="brand-logo">Instagram</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/create">Create Post</Link></li>
              <li><Link to="/myfollowerspost">My Following Post</Link></li>
              <li>
                <button className="btn #c62828 red darken-3"
                  onClick={() => {
                    localStorage.clear();
                    dispatch({ type: "LOGOUT" });
                    navigate('/signin');
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/signin">Sign in</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;