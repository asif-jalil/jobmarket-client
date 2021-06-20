import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import PackageCard from "./PackageCard";
import PageLayout from "../../PageLayout/PageLayout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import EmployerSignupForm from "./EmployerSignupForm";

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const packageData = [
  {
    id: 1,
    title: "basic",
    price: 10,
    feature: ["Receive Unlimited Application", "10 Hour Job Post"],
  },
  {
    id: 2,
    title: "standard",
    price: 20,
    feature: ["Receive Unlimited Application", "20 Hour Job Post"],
  },
  {
    id: 3,
    title: "premium",
    price: 30,
    feature: ["Receive Unlimited Application", "30 Hour Job Post"],
  },
];

const EmployerSignup = () => {
  const [active, setActive] = useState("pricing");

  return (
    <PageLayout>
      <div className="employer-signup">
        <Container className="py-5">
          {active && active === "pricing" && (
            <>
              <div className="section-title">
                <h3>Choose a Package</h3>
              </div>
              <div className="pricing-plans">
                <Row>
                  {packageData.map((pack) => (
                    <PackageCard
                      key={pack.id}
                      setActive={setActive}
                      pack={pack}
                    ></PackageCard>
                  ))}
                </Row>
              </div>
            </>
          )}

          {active && active === "signup" && (
            <>
              <div className="section-title">
                <h3>Login Credential</h3>
              </div>
              <EmployerSignupForm setActive={setActive}></EmployerSignupForm>
            </>
          )}

          {active && active === "payment" && (
            <>
              <div className="section-title">
                <h3>Payment with Stripe</h3>
              </div>
              <Elements stripe={stripePromise}>
                <PaymentForm setActive={setActive} />
              </Elements>
            </>
          )}
        </Container>
      </div>
    </PageLayout>
  );
};

export default EmployerSignup;
