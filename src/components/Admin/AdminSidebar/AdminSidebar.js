import React, { useState } from "react";
import { Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";
import firebase from "firebase/app";
import { useAuth } from "../../../App";

const AdminSidebar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const { currentUser, setIsAdmin } = useAuth();

  const toggleSidebar = () => {
    setSidebarActive(!sidebarActive);
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setIsAdmin(false);
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
        <NavLink exact to="/dashboard" className="nav-link">
          <i className="fas fa-shield-alt"></i> Dashboard
        </NavLink>
        <NavLink to="/dashboard/job-list" className="nav-link">
          <i className="fas fa-list-ul"></i> All jobs
        </NavLink>
        <NavLink to="/dashboard/application-list" className="nav-link">
          <i className="fas fa-list-ul"></i> All application
        </NavLink>
        <NavLink to="/dashboard/add-admin" className="nav-link">
          <i className="fas fa-user-lock"></i> Make Admin
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

export default AdminSidebar;
