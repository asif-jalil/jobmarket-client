import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./EmployeeLayout.css";
import EmployeeSidebar from "../EmployeeSidebar/EmployeeSidebar";
import Applications from "../Applications/Applications";
import AddJob from "../AddJob/AddJob";
import JobList from "../JobList/JobList";
import { useAuth } from "../../../App";
import { useState } from "react";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const Layout = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

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
        if (!data) {
          setLoading(false);
        }
      });
  }, [currentUser?.email]);

  return (
    <main>
      {loading ? (
        <div className="position-center text-center">
          <Spinner animation="border" role="status"></Spinner>
          <h5 className="theme-text mt-3">Checking Permission...</h5>
        </div>
      ) : (
        <>
          <EmployeeSidebar />
          <section className="dashboard-content">
            <Switch>
              <Route exact path="/dashboard/applications">
                <Applications />
              </Route>
              <Route path="/dashboard/add-job">
                <AddJob />
              </Route>
              <Route path="/dashboard/view-jobs">
                <JobList />
              </Route>
              <Route>
                <Redirect to="/dashboard/applications"></Redirect>
              </Route>
            </Switch>
          </section>
        </>
      )}
    </main>
  );
};

export default Layout;
