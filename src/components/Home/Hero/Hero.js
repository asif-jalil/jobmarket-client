import React from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Hero.css";

const Hero = () => {
  const jobs = useSelector(state => state.jobs.loadJobs)




  return (
    <section className="hero">
      <Container>
        <h1>Find Your Desired Job</h1>
        <div className="hero-icons">
          <div className="icon">
            <i className="fas fa-chart-line"></i>
            <div>
              <h4>Live Jobs</h4>
              <h5>{ jobs.length }</h5>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
