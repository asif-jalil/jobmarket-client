import React from "react";
import {
    useStripe,
    useElements,
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
} from "@stripe/react-stripe-js";
import { Col, Row, Alert, Spinner } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../../App";
import { useHistory, useLocation } from "react-router-dom";
import firebase from "firebase/app";

const PaymentForm = ({ setActive }) => {
    const [error, setError] = useState();
    const [loader, setLoader] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const userInfo = useSelector((state) => state.empSignup.userData);
    const packageInfo = useSelector((state) => state.empSignup.chosenPackage);
    const { setCurrentUser } = useAuth();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

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
            setDisabledBtn(false);
            setLoader(false);
        } else {
            const cardInfo = {
                pm_id: paymentMethod.id,
                card: paymentMethod.card,
            };
            const packageDetails = {
                package: packageInfo,
                cardInfo: cardInfo,
            };

            fetch("https://pure-inlet-61267.herokuapp.com/signup-employee", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: userInfo.name,
                    email: userInfo.email,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        console.log("got signup");
                        if (data) {
                            console.log("got signup true");
                            fetch(
                                "https://pure-inlet-61267.herokuapp.com/employee-package",
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(packageDetails),
                                }
                            )
                                .then((res2) => res2.json())
                                .then((data) => {
                                    console.log("got package");

                                    if (data) {
                                        console.log("got package true");

                                        userLogin(
                                            userInfo.name,
                                            userInfo.email,
                                            userInfo.password
                                        );
                                        setDisabledBtn(false);
                                        setLoader(false);
                                    }
                                });
                        }
                    }
                });
        }
    };

    const userLogin = (name, email, password) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                // var user = userCredential.user;
                updateUserProfile(name);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                setError(errorMessage);
            });
    };

    const updateUserProfile = (name) => {
        const currentUser = firebase.auth().currentUser;
        currentUser
            .updateProfile({
                displayName: name,
            })
            .then(function () {
                setCurrentUser(currentUser);
                history.push(from);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <form className="payment-form" onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <label>Card number</label>
                            <CardNumberElement
                                options={{ showIcon: true }}
                                className="form-control"
                            />
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
                        <button
                            type="button"
                            onClick={() => setActive("signup")}
                            disabled={!stripe}
                            className="button main-btn main-btn-sm main-btn-transparent mr-3"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            disabled={!stripe || disabledBtn}
                            className="button main-btn main-btn-sm main-btn-transparent"
                        >
                            Pay
                        </button>
                        {loader && (
                            <Spinner
                                animation="border"
                                className="position-absolute mt-2 ml-3"
                            ></Spinner>
                        )}
                    </Col>
                </Row>
            </form>
        </>
    );
};

export default PaymentForm;
