import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./SeekerLayout.css";
import SeekerSidebar from "../SeekerSidebar/SeekerSidebar";
import ApplyJob from "../ApplyJob/ApplyJob";
import Applications from "../Applications/Applications";
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
          <SeekerSidebar />
          <section className="dashboard-content">
            <Switch>
              <Route exact path="/dashboard/applications">
                <Applications />
              </Route>
              <Route path="/dashboard/apply/:jobId">
                <ApplyJob />
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
