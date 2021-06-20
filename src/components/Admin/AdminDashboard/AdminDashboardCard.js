import React from "react";
import { Card, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import "./AdminDashboardCard.css";

const AdminDashboardCard = ({ item }) => {
  const { number, title, bg, link } = item;
  const history = useHistory();

  const handleClick = () => {
    history.push(link);
  };

  return (
    <Col lg={3} sm={6}>
      <Card onClick={handleClick} className="text-white dashboard-card mb-30" style={{ background: bg }}>
        <Card.Body className="d-flex align-items-center justify-content-center">
          <div className="dashboard-card-number">{number}</div>
          <div className="dashboard-card-text">{title}</div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default AdminDashboardCard;
