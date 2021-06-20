import React from "react";
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from "@stripe/react-stripe-js";
import { Col, Row, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";

const PaymentForm = ({ setActive, userInfo, boatInfo, boat }) => {
  const [error, setError] = useState();
  const [loader, setLoader] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoader(true);
    setDisabledBtn(true);
    const cardElement = elements.getElement(CardNumberElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
    } else {
      const status = "pending";
      const cost = parseInt(boatInfo?.boatFair) * userInfo?.day;
      const cardInfo = { pm_id: paymentMethod.id, card: paymentMethod.card };
      fetch("https://salty-journey-40699.herokuapp.com/add-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, boat, ...userInfo, cost, ...cardInfo }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setLoader(false);
            setDisabledBtn(false);
            setActive("thank");
          }
        });
    }
  };

  const handleBack = () => {
    setActive("info");
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <form className="payment-form" onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <div className="mb-3">
              <label>Card number</label>
              <CardNumberElement options={{ showIcon: true }} className="form-control" />
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-3">
              <label>Expiration date</label>
              <CardExpiryElement className="form-control" />
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-3">
              <label>CVC</label>
              <CardCvcElement className="form-control" />
            </div>
          </Col>
          <Col xs={12}>
            <button type="button" onClick={handleBack} disabled={!stripe} className="button main-btn main-btn-sm main-btn-transparent mr-3">
              Back
            </button>
            <button type="submit" disabled={!stripe || disabledBtn} className="button main-btn main-btn-sm main-btn-transparent">
              Pay
            </button>
            {loader && <Spinner animation="border" className="position-absolute mt-2 ml-3"></Spinner>}
          </Col>
        </Row>
      </form>
    </>
  );
};

export default PaymentForm;
