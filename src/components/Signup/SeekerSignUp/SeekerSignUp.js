import React from "react";
import { Card, Container, Row, Col, Alert, Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import "../../Login/Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../Login/firebase.config";
import { useAuth } from "../../../App";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PageLayout from "../../PageLayout/PageLayout";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SeekerSignUp = () => {
  const { setCurrentUser } = useAuth();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        // Signed in
        // var user = userCredential.user;
        fetch("https://pure-inlet-61267.herokuapp.com/signup-seeker", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: data.name, email: data.email }),
        })
          .then((res) => res.json())
          .then((result) => {
            if (result) {
              updateUserProfile(data.name);
            }
          });
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
    <PageLayout>
      <section className="login">
        <Container>
          <Row className="justify-content-center">
            <Col md={{ span: 7 }} lg={{ span: 5 }}>
              {error && <Alert variant="danger">{error}</Alert>}
              <Card className="shadow-lg border-0">
                <Card.Body>
                  <h2 className="text-center mb-4">Job Seeker Sign Up</h2>
                  <div className="w-100 mt-4 mb-4">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control border-danger"
                          {...register("name", { required: true })}
                          placeholder="Enter Your Name"
                        />
                        {errors.name && (
                          <span className="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>

                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control border-danger"
                          {...register("email", { required: true })}
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
                            pattern: /[A-Za-z0-9]{6,14}$/,
                            required: true,
                          })}
                          placeholder="Enter Password"
                        />
                        {errors.password && (
                          <span className="text-danger">
                            Contain at least 6 character (only Letter & Number)
                          </span>
                        )}
                      </div>

                      <Button type="submit" variant="danger">
                        Submit
                      </Button>
                    </form>
                  </div>
                  <div>
                    <p>
                      Already Have An Account?{" "}
                      <Link to="/login" className="theme-text">
                        Login Here
                      </Link>
                    </p>
                    <p>
                      Wanna SignUp for employee?{" "}
                      <Link to="/signup-employer" className="theme-text">
                        Signup as an Employee
                      </Link>
                    </p>
                  </div>
                  <div className="w-100 text-center mt-3">
                    <Link to="/" className="btn btn-link theme-text">
                      Go to Home
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

export default SeekerSignUp;
