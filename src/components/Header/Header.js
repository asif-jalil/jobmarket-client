import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../App";
import logo from "../../images/logo.svg";
import "./Header.css";

const Header = () => {
  const { currentUser, isAdmin } = useAuth();

  return (
    <header>
      <Navbar bg="light" expand="lg" className="main-menu">
        <Link to="/" className="navbar-brand py-0">
          <img src={logo} alt="" className="mr-2" /> JOB MARKET
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto mt-2 mt-lg-0">
            <NavLink exact to="/" className="nav-link">
              Home
            </NavLink>
            {currentUser ? (
              isAdmin ? (
                <NavLink to="/dashboard" className="nav-link">
                  Dashboard ({currentUser.displayName})
                </NavLink>
              ) : (
                <NavLink to="/dashboard/bookings" className="nav-link">
                  Dashboard ({currentUser.displayName})
                </NavLink>
              )
            ) : (
              <>
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
                <NavDropdown title="Signup" id="signup-dropdown">
                  <Link className="dropdown-item" to="/signup-employer">For Employer</Link>
                  <Link className="dropdown-item" to="/signup-seeker">For Job Seeker</Link>
                </NavDropdown>
            </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
