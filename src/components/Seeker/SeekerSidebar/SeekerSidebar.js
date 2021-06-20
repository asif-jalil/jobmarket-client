import React, { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../App";
import "./SeekerSidebar.css";
import firebase from "firebase/app";

const SeekerSidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const { currentUser, setIsSeeker } = useAuth();

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("Singed Out successfully");
        setIsSeeker(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <aside className={`sidebar py-4 ${sidebarActive ? "active" : ""}`}>
      <Button onClick={toggleSidebar} className="sidebar-toggle d-block d-xl-none" variant="warning">
        {sidebarActive ? <i className="far fa-times"></i> : <i className="fas fa-bars"></i>}
      </Button>
      <h4 className="text-center text-white mb-5">Hello, {currentUser.displayName ? currentUser.displayName : "Stranger"}</h4>
      <Nav className="flex-column px-4">
        <NavLink to="/dashboard/applications" className="nav-link">
          <i className="fas fa-clipboard-check"></i> Applications
        </NavLink>
        <NavLink exact to="/" className="nav-link">
          <i className="far fa-home"></i> Home
        </NavLink>
        <NavLink onClick={handleLogout} exact to="/" className="nav-link mt-auto">
          <i className="fas fa-sign-out-alt"></i> Logout
        </NavLink>
      </Nav>
    </aside>
  );
};

export default SeekerSidebar;
