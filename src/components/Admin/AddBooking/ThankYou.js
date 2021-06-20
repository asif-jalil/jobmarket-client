import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import checkIcon from "../../../images/checkmark.svg";

const ThankYou = ({ userInfo, boatInfo }) => {
  return (
    <Row className="justify-content-center">
      <Col lg={5} md={7}>
        <Card className="shadow-lg border-0 text-center">
          <Card.Body>
            <img src={checkIcon} alt="" className="mb-4" />
            <h3 className="card-title mb-5">Thank You For Hire Us</h3>
            <Card.Subtitle className="mb-3">Booking Details</Card.Subtitle>
            <Card.Text className="mb-0">Name: {userInfo.name}</Card.Text>
            <Card.Text className="mb-0">Email: {userInfo.email}</Card.Text>
            <Card.Text className="mb-0">Boat: {boatInfo?.boatName}</Card.Text>
            <Card.Text className="mb-0">Day: {userInfo.day}</Card.Text>
            <Card.Text className="mb-0">Total Cost: ${userInfo.day * parseInt(boatInfo?.boatFair)}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ThankYou;
