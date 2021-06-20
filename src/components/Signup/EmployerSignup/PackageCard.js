import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getPackage } from "../../../redux/actions/empSignupAction";

const PackageCard = ({ pack, setActive }) => {
  const dispatch = useDispatch();

  const choosePackage = () => {
    const info = {
      packageId: pack.id,
      price: pack.price,
    };
    dispatch(getPackage(info));
    setActive("signup");
  };

  return (
    <Col md={4}>
      <Card className="border-0 shadow">
        <Card.Body className="text-center">
          <Card.Title className="text-capitalize">{pack.title}</Card.Title>
          <h2>{pack.price}$</h2>
          {pack.feature.map((f) => (
            <Card.Text>{f}</Card.Text>
          ))}
          <Button onClick={choosePackage} variant="danger" className="w-100">
            Buy Now
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PackageCard;
