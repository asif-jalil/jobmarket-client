import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ManageBoatCard from "./ManageBoatCard";
import "./ManageBoat.css";

const ManageBoat = () => {
  const [boats, setBoats] = useState([]);
  const [loader, setLoader] = useState(true);
  const [deleteStatus, setDeleteStatus] = useState(false);

  useEffect(() => {
    fetch("https://salty-journey-40699.herokuapp.com/boats")
      .then((res) => res.json())
      .then((data) => {
        setBoats(data);
        setLoader(false);
      });
  }, [deleteStatus]);

  const handleDelete = (id, cb) => {
    fetch(`https://salty-journey-40699.herokuapp.com/delete-boat?id=${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          cb();
          setDeleteStatus(!deleteStatus);
        }
      });
  };

  return (
    <Container fluid>
      <h3 className="dashboard-page-title">
        All Boats{" "}
        <Link to="/add-boat" className="button main-btn main-btn-sm main-btn-transparent ml-5">
          Add New
        </Link>
      </h3>
      <div className="dashboard-total-boat">
        {loader ? (
          <Spinner animation="border"></Spinner>
        ) : (
          <Row>
            {boats.map((boat, idx) => (
              <ManageBoatCard key={idx} boat={boat} handleDelete={handleDelete} />
            ))}
          </Row>
        )}
      </div>
    </Container>
  );
};

export default ManageBoat;
