import React from "react";
import { Card, Container, Row, Col, Alert, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useAuth } from "../../App";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PageLayout from "../PageLayout/PageLayout";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const { setCurrentUser, isAdmin, isEmployee, isSeeker } = useAuth();
    let history = useHistory();
    let path;
    if (isAdmin) {
        path = "/dashboard";
    } else if (isEmployee) {
        path = "/dashboard";
    } else if (isSeeker) {
        path = "/";
    } else {
        path = "/"
    }


    const [error, setError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                setCurrentUser(user);
                history.push(path);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                setError(errorMessage);
            });
    };

    return (
        <PageLayout>
            <section className="login">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={{ span: 7 }} lg={{ span: 5 }}>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Card className="shadow-lg border-0">
                                <Card.Body>
                                    <h2 className="text-center mb-4">Log In</h2>
                                    <p className="mb-0">Admin Email: asifjalil0@gmail.com</p>
                                    <p>Admin Password: 123456</p>
                                    <div className="w-100 mt-4 mb-4">
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <div className="mb-3">
                                                <input
                                                    type="email"
                                                    className="form-control border-danger"
                                                    {...register("email", {
                                                        required: true,
                                                    })}
                                                    placeholder="Enter Your Email"
                                                />
                                                {errors.email && (
                                                    <span className="text-danger">
                                                        This field is required
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <input
                                                    type="password"
                                                    className="form-control border-danger"
                                                    {...register("password", {
                                                        pattern:
                                                            /[A-Za-z0-9]{6,14}$/,
                                                        required: true,
                                                    })}
                                                    placeholder="Enter Password"
                                                />
                                                {errors.password && (
                                                    <span className="text-danger">
                                                        Contain at least 6
                                                        character (only Letter &
                                                        Number)
                                                    </span>
                                                )}
                                            </div>

                                            <Button
                                                type="submit"
                                                variant="danger"
                                            >
                                                Submit
                                            </Button>
                                        </form>
                                    </div>
                                    <div>
                                        <p>
                                            Haven't Account? Create An Account.
                                        </p>
                                        <Link
                                            to="/signup-employer"
                                            className="btn btn-sm btn-info mr-2"
                                        >
                                            As an Employee
                                        </Link>
                                        <Link
                                            to="/signup-seeker"
                                            className="btn btn-sm btn-info"
                                        >
                                            As a Job Seeker
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </PageLayout>
    );
};

export default Login;
