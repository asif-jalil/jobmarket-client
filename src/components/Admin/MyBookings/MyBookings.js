import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../../../App";
import "./MyBooking.css";
import MyBookingCard from "./MyBookingCard";

const MyBookings = () => {
  const { currentUser } = useAuth();
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    fetch("https://salty-journey-40699.herokuapp.com/booking-by-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMyBookings(data);
        console.log(data);
      });
  }, [currentUser.email]);

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">Your Bookings</h3>
      <Row>
        {myBookings.map((booking) => (
          <MyBookingCard booking={booking} />
        ))}
      </Row>
    </Container>
  );
};

export default MyBookings;
