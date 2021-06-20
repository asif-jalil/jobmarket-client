import React from "react";
import { useState } from "react";
import { Col, Container, Row, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "./AddBoat.css";

const AddBoat = () => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setDisableBtn(true);
    setLoader(true);
    setSuccess("");
    let boatData = new FormData();
    boatData.set("boatImg", data.boatImg[0]);
    boatData.append("boatName", data.boatName);
    boatData.append("boatFair", data.boatFair);
    boatData.append("boatLocation", data.boatLocation);
    boatData.append("boatBarths", data.boatBarths);

    fetch("https://salty-journey-40699.herokuapp.com/add-boat", {
      method: "POST",
      body: boatData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        reset();
        setDisableBtn(false);
        setLoader(false);
        setSuccess("You have successfully added a boat");
      });
  };

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">Add A New Boat</h3>
      <div className="position-relative add-boat">
        {success && <Alert variant="success">{success}</Alert>}
        <form id="add-boat-form" className="add-boat-form" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Boat Name</label>
                <input type="text" className="form-control" {...register("boatName", { required: true })} />
                {errors.boatName && <polyline className="error">This field is required</polyline>}
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Boat Fair (Per Day)</label>
                <input type="number" className="form-control" {...register("boatFair", { required: true })} />
                {errors.boatFair && <p className="error">This field is required</p>}
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Boat Location</label>
                <input type="text" className="form-control" {...register("boatLocation", { required: true })} />
                {errors.boatLocation && <p className="error">This field is required</p>}
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Barths</label>
                <input type="number" className="form-control" {...register("boatBarths", { required: true })} />
                {errors.boatBarths && <p className="error">This field is required</p>}
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3">
                <label htmlFor="">Boat Image</label> <br />
                <label className="boat-img-upload" htmlFor="boat-img-upload">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <span> Upload Image</span>
                  <input type="file" id="boat-img-upload" {...register("boatImg", { required: true })} />
                </label>
                {errors.boatImg && <p className="error">This field is required</p>}
              </div>
            </Col>
            <Col sm={12}>
              <button type="submit" disabled={disableBtn} className="button main-btn main-btn-sm main-btn-transparent">
                Add Boat
              </button>
              {loader && <Spinner className="ml-4 mt-1 position-absolute" animation="border"></Spinner>}
            </Col>
          </Row>
        </form>
      </div>
    </Container>
  );
};

export default AddBoat;
