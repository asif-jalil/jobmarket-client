import React, { useState } from "react";
import { Card, Col, Spinner } from "react-bootstrap";
import "./ManageBoatCard.css";

const ManageBoatCard = ({ boat, handleDelete }) => {
  const { _id, boatImg, boatName, boatFair, boatLocation, boatBarths } = boat;
  const { img, mimetype } = boatImg;
  const [loader, setLoader] = useState(false);

  const handleClick = () => {
    setLoader(true);
    handleDelete(_id, () => {
      setLoader(false);
    });
  };

  return (
    <Col md={6}>
      <Card className="shadow border-0 dashboard-boat">
        <Card.Body className="d-flex align-items-start">
          <img className="mr-3" src={`data:${mimetype};base64, ${img}`} alt="" />
          <div>
            <Card.Title className="mb-4">{boatName}</Card.Title>
            <Card.Subtitle className="mb-2">${boatFair} / Day</Card.Subtitle>
            <Card.Text className="mb-0">Location: {boatLocation}</Card.Text>
            <Card.Text className="mb-0">Barths: {boatBarths}</Card.Text>
          </div>
          {loader ? (
            <Spinner animation="border"></Spinner>
          ) : (
            <button onClick={handleClick} className="icon-btn">
              <i className="fas fa-trash"></i>
            </button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ManageBoatCard;
