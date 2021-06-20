import React from "react";
import { Container } from "react-bootstrap";
import AddBookingForm from "./AddBookingForm";
import "./AddBooking.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import ThankYou from "./ThankYou";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const AddBooking = () => {
  const [userInfo, setUserInfo] = useState();
  const [fair, setFair] = useState();
  const [active, setActive] = useState("info");
  const { boat } = useParams();
  const [boatInfo, setBoatInfo] = useState({});
  const [boatChange, setBoatChange] = useState();

  useEffect(() => {
    fetch(`https://salty-journey-40699.herokuapp.com/boatByName/${boat}`)
      .then((res) => res.json())
      .then((data) => {
        setBoatInfo(data[0]);
        console.log(data[0]);
      });
  }, [boat]);

  const onSubmit = (data) => {
    setUserInfo(data);
    setFair(boatInfo?.boatFair);
    setActive("payment");
  };

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">Hire A Boat</h3>
      <div className="form-step">
        <div className={`step ${active && active === "info" && "active"}`}>
          <span>1</span>
          <p>Information</p>
        </div>
        <div className={`step ${active && active === "payment" && "active"}`}>
          <span>2</span>
          <p>Payment</p>
        </div>
        <div className={`step ${active && active === "thank" && "active"}`}>
          <span>3</span>
          <p>Thank You</p>
        </div>
      </div>
      {!(active === "thank") && (
        <h5 className="theme-text text-center mb-3">
          You are about to hire <strong>{boatChange || boat}</strong>
        </h5>
      )}
      {active === "payment" && (
        <h6 className="theme-text text-center mb-5">
          Total Cost: ${parseInt(boatInfo?.boatFair || fair) * parseInt(userInfo?.day)} (Per Day ${boatInfo?.boatFair})
        </h6>
      )}
      {active && active === "info" && <AddBookingForm userInfo={userInfo} boat={boat} onSubmit={onSubmit} boatChange={boatChange} setBoatChange={setBoatChange} setBoatInfo={setBoatInfo} />}
      {active && active === "payment" && (
        <Elements stripe={stripePromise}>
          <PaymentForm active={active} setActive={setActive} userInfo={userInfo} boatInfo={boatInfo} boat={boat} />
        </Elements>
      )}
      {active && active === "thank" && <ThankYou userInfo={userInfo} boatInfo={boatInfo} />}
    </Container>
  );
};

export default AddBooking;
