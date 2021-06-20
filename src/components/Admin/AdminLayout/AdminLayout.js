import React from "react";
import { Switch, Route } from "react-router-dom";
import "./AdminLayout.css";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import AdminSidebar from "../AdminSidebar/AdminSidebar";
import JobList from "../JobList/JobList";
import ApplicationList from "../ApplicationList/ApplicationList";
import AddAdmin from "../AddAdmin/AddAdmin";
import { useAuth } from "../../../App";
import { useEffect } from "react";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const { currentUser, setIsAdmin } = useAuth();

  useEffect(() => {
    fetch("https://salty-journey-40699.herokuapp.com/check-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser?.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setIsAdmin(true);
          setLoading(false);
        }
      });
  }, [currentUser?.email, setIsAdmin]);

  return (
    <main>
      {loading ? (
        <div className="position-center text-center">
          <Spinner animation="border" role="status"></Spinner>
          <h5 className="theme-text mt-3">Checking Admin Permission...</h5>
        </div>
      ) : (
        <>
          <AdminSidebar />
          <section className="dashboard-content">
            <Switch>
              <Route exact path="/dashboard">
                <AdminDashboard />
              </Route>
              <Route exact path="/dashboard/job-list">
                <JobList />
              </Route>
              <Route exact path="/dashboard/application-list">
                <ApplicationList />
              </Route>
              <Route path="/dashboard/add-admin">
                <AddAdmin />
              </Route>
            </Switch>
          </section>
        </>
      )}
    </main>
  );
};

export default AdminLayout;
