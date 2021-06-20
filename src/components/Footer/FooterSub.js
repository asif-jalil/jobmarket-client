import React from "react";
import { Col } from "react-bootstrap";

const FooterSub = () => {
  return (
    <Col lg={6}>
      <h5 className="foot-title">subscribe to our newsletter</h5>
      <div className="foot-serach">
        <input type="text" placeholder="Your email address" />
        <button className="button subscribe-btn">Subscribe</button>
      </div>
      <div className="social">
        <a href="www.faceboook.com">
          <span>
            <i className="fab fa-facebook-f"></i>
          </span>
        </a>
        <a href="www.faceboook.com">
          <span>
            <i className="fab fa-twitter"></i>
          </span>
        </a>
        <a href="www.faceboook.com">
          <span>
            <i className="fab fa-google-plus-g"></i>
          </span>
        </a>
      </div>
    </Col>
  );
};

export default FooterSub;
