import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../Login/Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../Login/firebase.config";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getCredential } from "../../../redux/actions/empSignupAction";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const EmployerSignupForm = ({ setActive }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.empSignup.userData);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(getCredential(data));
    setActive("payment");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={4}>
          <div className="mb-3">
            <input
              defaultValue={userInfo ? userInfo.name : ""}
              type="text"
              className="form-control border-danger"
              {...register("name", { required: true })}
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </Col>

        <Col md={4}>
          <div className="mb-3">
            <input
              defaultValue={userInfo ? userInfo.email : ""}
              type="email"
              className="form-control border-danger"
              {...register("email", { required: true })}
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <span className="text-danger">This field is required</span>
            )}
          </div>
        </Col>

        <Col md={4}>
          <div className="mb-3">
            <input
              defaultValue={userInfo ? userInfo.password : ""}
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
        </Col>

        <Col sm={12}>
          <button
            type="button"
            onClick={()=> setActive("pricing")}
            className="button main-btn main-btn-sm main-btn-transparent mr-3"
          >
            Back
          </button>
          <button
            type="submit"
            className="button main-btn main-btn-sm main-btn-transparent"
          >
            Next
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default EmployerSignupForm;
