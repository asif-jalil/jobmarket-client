import React from "react";
import { useForm } from "react-hook-form";
import { Col, Row } from "react-bootstrap";
import { useAuth } from "../../../App";
import { useState } from "react";
import { useEffect } from "react";

const AddBookingForm = ({ userInfo, boat, onSubmit, boatChange, setBoatChange, setBoatInfo }) => {
  const { currentUser } = useAuth();
  const [boats, setBoats] = useState([]);

  useEffect(() => {
    fetch("https://salty-journey-40699.herokuapp.com/boats")
      .then((res) => res.json())
      .then((data) => {
        setBoats(data);
      });
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setBoatChange(watch("boat"));
  }, [watch("boat")]);

  useEffect(() => {
    const findBoat = boats.find((boat) => boat.boatName === boatChange);
    setBoatInfo(findBoat);
  }, [boatChange, boats, setBoatInfo]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={6}>
          <div className="mb-3">
            <label htmlFor="">Your Name</label>
            <input defaultValue={userInfo ? userInfo.name : currentUser.displayName} type="text" className="form-control" {...register("name", { required: true })} />
            {errors.name && <span className="error">This field is required</span>}
          </div>
        </Col>
        <Col md={6}>
          <div className="mb-3">
            <label htmlFor="">Email</label>
            <input readOnly defaultValue={userInfo ? userInfo.email : currentUser.email} type="text" className="form-control" {...register("email", { required: true })} />
            {errors.email && <span className="error">This field is required</span>}
          </div>
        </Col>
        {!boat && (
          <Col md={6}>
            <div className="mb-3">
              <label htmlFor="">Boat</label>
              <select className="form-control" {...register("boat", { required: true })}>
                {boats.map((boat, idx) => (
                  <option defaultValue={boat} key={idx} value={boat.boatName}>
                    {boat.boatName}
                  </option>
                ))}
              </select>
              {errors.boat && <span className="error">This field is required</span>}
            </div>
          </Col>
        )}
        <Col md={6}>
          <div className="mb-3">
            <label htmlFor="">Day</label>
            <input defaultValue={userInfo?.day} type="number" className="form-control" {...register("day", { required: true })} />
            {errors.day && <span className="error">This field is required</span>}
          </div>
        </Col>
        <Col sm={12}>
          <button type="submit" className="button main-btn main-btn-sm main-btn-transparent">
            Next
          </button>
        </Col>
      </Row>
    </form>
  );
};

export default AddBookingForm;
