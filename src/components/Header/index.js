import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css'
function Header() {
  const location = useLocation();
  const currentLocation = location.pathname;
  console.log("path", currentLocation);
  return (
    <div className="nav">
      <div className="gradient"></div>
      <div className="links">
        <Link to="/" className={currentLocation == "/" ? "active" : ""}>
          Signup{" "}
        </Link>
        <Link to="/Podcasts" className={currentLocation == "/Podcasts" ? "active" : ""}>
          Podcasts
        </Link>
        <Link
          to="/create-a-podcast"
          className={currentLocation == "/create-a-podcast" ? "active" : ""}
        >
          Start a podcast
        </Link>
        <Link
          to="/Profile"
          className={currentLocation == "/Profile" ? "active" : ""}
        >
          Profile
        </Link>
      </div>
    </div>
  );
}

export default Header