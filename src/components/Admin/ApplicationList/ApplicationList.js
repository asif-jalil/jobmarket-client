import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../../../App";
import ApplicationListCard from "./ApplicationListCard";
import "./ApplicationList.css";

const ApplicationList = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/applications")
      .then((res) => res.json())
      .then((data) => {
        setApplications(data);
        console.log(data);
      });
  }, [currentUser.email]);

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">Candidate Application</h3>
      <Row>
        {applications.map((app) => (
          <ApplicationListCard key={app._id} application={app} />
        ))}
      </Row>
    </Container>
  );
};

export default ApplicationList;