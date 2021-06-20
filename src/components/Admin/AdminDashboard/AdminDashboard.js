import React from "react";
import { Container, Row } from "react-bootstrap";
import "./AdminDashboard.css";
import AdminDashboardCard from "./AdminDashboardCard";

const AdminDashboard = () => {
  const dashboardItems = [
    {
      number: "09",
      title: "Total Booking",
      bg: "#F1536E",
      link: "/dashboard/booking-list",
    },
    {
      number: "04",
      title: "Total Boat",
      bg: "#3DA5F4",
      link: "/dashboard/boats",
    },
    {
      number: "31",
      title: "Total Review",
      bg: "#00C689",
      link: "/dashboard",
    },
    {
      number: "11",
      title: "Total Admin",
      bg: "#FDA006",
      link: "/dashboard",
    },
  ];

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">Dashboard</h3>
      <Row>
        {dashboardItems.map((item, idx) => (
          <AdminDashboardCard key={idx} item={item} />
        ))}
      </Row>
    </Container>
  );
};

export default AdminDashboard;
