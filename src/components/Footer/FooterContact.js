import React from "react";
import { Col } from "react-bootstrap";

const FooterContact = () => {
  return (
    <Col lg={3}>
      <h5 className="foot-title">contact us</h5>
      <ul className="foot-contact">
        <li>
          <span>
            <i className="fas fa-home"></i>
          </span>{" "}
          Jessore, Bangladesh
        </li>
        <li>
          <span>
            <i className="fas fa-phone-alt"></i>
          </span>{" "}
          +009283 373737
        </li>
        <li>
          <span>
            <i className="fas fa-envelope"></i>
          </span>
          admin@asifjail.com
        </li>
      </ul>
    </Col>
  );
};

export default FooterContact;
