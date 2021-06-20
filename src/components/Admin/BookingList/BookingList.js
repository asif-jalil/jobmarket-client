import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Spinner, Table } from "react-bootstrap";
import "./BookingList.css";
import BookingListRow from "./BookingListRow";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleStatus = (status, id) => {
    fetch(`https://salty-journey-40699.herokuapp.com/statusUpdate/${id}?status=${status}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setStatusUpdate(!statusUpdate);
        }
      });
  };

  useEffect(() => {
    setLoader(true);
    fetch("https://salty-journey-40699.herokuapp.com/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoader(false);
      });
  }, [statusUpdate]);

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">All Bookings</h3>
      <Table borderless hover responsive className="booking-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Boat Name</th>
            <th>Day(s)</th>
            <th>Cost</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{loader ? <Spinner animation="border"></Spinner> : bookings.map((booking, idx) => <BookingListRow key={idx} booking={booking} handleStatus={handleStatus} />)}</tbody>
      </Table>
    </Container>
  );
};

export default BookingList;
