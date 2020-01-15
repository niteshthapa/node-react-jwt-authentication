import React, { useContext, Fragment } from 'react';
import AuthContext from "../../context/auth/authContext";
import { Link } from 'react-router-dom';
const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logOut, user } = authContext;
  const authLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <a onClick={logOut} className="nav-link" href="#!">

          Logout
        </a>
      </li>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </Fragment>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <a className="navbar-brand  font-weight-bold" href="">React Auth Demo</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          {isAuthenticated ? authLinks : guestLinks}
        </ul>
        <span className="navbar-text">
          {user && user.name}
        </span>
      </div>
    </nav>
  )
}
export default Navbar;