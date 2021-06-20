import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./AdminDashboard.css";
import AdminDashboardCard from "./AdminDashboardCard";

const AdminDashboard = () => {
  const jobs = useSelector(state => state.jobs.loadJobs);
  const [applications, setApplications] = useState([])
  const [employees, setEmployees] = useState([])
  const [jobSeeker, setJobSeeker] = useState([])

  useEffect(() => {
    fetch("https://pure-inlet-61267.herokuapp.com/applications")
      .then(res => res.json())
      .then(data => setApplications(data))
  }, [])

  useEffect(() => {
    fetch("https://pure-inlet-61267.herokuapp.com/employees")
      .then(res => res.json())
      .then(data => setEmployees(data))
  }, [])

  useEffect(() => {
    fetch("https://pure-inlet-61267.herokuapp.com/seekers")
      .then(res => res.json())
      .then(data => setJobSeeker(data))
  }, [])
  
  const dashboardItems = [
    {
      id: 1,
      number: jobs.length,
      title: "Total Jobs",
      bg: "#F1536E",
      link: "/dashboard/job-list",
    },
    {
      id:2,
      number: applications.length,
      title: "Total Applications",
      bg: "#3DA5F4",
      link: "/dashboard/application-list",
    },
    {
      id: 3,
      number: employees.length,
      title: "Total Employees",
      bg: "#00C689",
      link: "/dashboard",
    },
    {
      id: 4,
      number: jobSeeker.length,
      title: "Total Job Seeker",
      bg: "#FDA006",
      link: "/dashboard",
    },
  ];

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">Dashboard</h3>
      <Row>
        {dashboardItems.map((item) => (
          <AdminDashboardCard key={item.id} item={item} />
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;
