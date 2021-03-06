import React from "react";
import { useState } from "react";
import { Col, Container, Row, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";

const AddAdmin = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("")
  const [loader, setLoader] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setLoader(true);
    fetch("https://pure-inlet-61267.herokuapp.com/add-admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setSuccess("An Admin Added Successfully");
          setLoader(false);
          reset();
        } else {
          setError("This email is already in use by another account")
          setLoader(false);
          reset();
        }
        setTimeout(() => {
          setSuccess("")
          setError("")
        }, 5000)

      });
  };

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">Add An Admin</h3>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col md={6}>
            <div className="mb-3">
              <label htmlFor="">Admin Name</label>
              <input type="text" className="form-control" {...register("name", { required: true })} />
              {errors.name && <span className="error">This field is required</span>}
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <label htmlFor="">Admin Email</label>
              <input type="email" className="form-control" {...register("email", { required: true })} />
              {errors.email && <span className="error">This field is required</span>}
            </div>
          </Col>
          <Col sm={12}>
            <button type="submit" className="button main-btn main-btn-sm main-btn-transparent">
              Add Admin 
            </button>
            {loader && <Spinner className="ml-4 mt-1 position-absolute" animation="border"></Spinner>}
          </Col>
        </Row>
      </form>
    </Container>
  );
};

export default AddAdmin;
