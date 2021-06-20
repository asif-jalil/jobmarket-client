import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../../../App";
import ApplicationCard from "./ApplicationCard";
import "./Applications.css";

const Applications = () => {
  const { currentUser } = useAuth();
  const [myApplications, setMyApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/application-by-employee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMyApplications(data);
        console.log(data);
      });
  }, [currentUser.email]);

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">Candidate Application</h3>
      <Row>
        {myApplications.map((app) => (
          <ApplicationCard key={app._id} application={app} />
        ))}
      </Row>
    </Container>
  );
};

export default Applications;
