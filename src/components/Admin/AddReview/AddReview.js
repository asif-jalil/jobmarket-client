import React, { useEffect, useState } from "react";
import { Col, Container, Row, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../App";

const AddReview = () => {
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [success, setSuccess] = useState("");
  const [alreadyDone, setAlreadyDone] = useState("");
  const { currentUser } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("https://salty-journey-40699.herokuapp.com/review-by-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: currentUser.email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setAlreadyDone("You Have Already Made Your Review.  You Can't Make Anymore");
          setDisabledBtn(true);
        }
        setLoading(false);
      });
  }, [currentUser, success]);

  const onSubmit = (data) => {
    setDisabledBtn(true);
    setLoader(true);
    const reviewInfo = { ...data, email: currentUser.email };
    fetch("https://salty-journey-40699.herokuapp.com/add-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result) {
          setDisabledBtn(false);
          setLoader(false);
          setSuccess("Your review is added successfully.");
          reset();
        }
      });
  };

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">Write A Review</h3>
      {success && <Alert variant="success">{success}</Alert>}
      {alreadyDone && <Alert variant="danger">{alreadyDone}</Alert>}
      {!loading && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={4}>
              <div className="mb-3">
                <label htmlFor="">You Name*</label>
                <input type="text" defaultValue={currentUser.displayName} readOnly className="form-control" {...register("name", { required: true })} />
                {errors.name && <span className="error">This field is required</span>}
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-3">
                <label htmlFor="">Company</label>
                <input type="text" className="form-control" {...register("company")} />
                {errors.company && <span className="error">This field is required</span>}
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-3">
                <label htmlFor="">Designation</label>
                <input type="text" className="form-control" {...register("designation")} />
                {errors.designation && <span className="error">This field is required</span>}
              </div>
            </Col>
            <Col md={12}>
              <div className="mb-3">
                <label htmlFor="">Review*</label>
                <textarea rows="5" className="form-control" {...register("message", { required: true })} />
                {errors.message && <span className="error">This field is required</span>}
              </div>
            </Col>
            <Col sm={12}>
              <button type="submit" disabled={disabledBtn} className="button main-btn main-btn-sm main-btn-transparent">
                Add Review
              </button>
              {loader && <Spinner className="ml-4 mt-1 position-absolute" animation="border"></Spinner>}
            </Col>
          </Row>
        </form>
      )}
    </Container>
  );
};

export default AddReview;
