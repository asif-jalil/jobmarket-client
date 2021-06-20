import React from "react";
import { Container, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./Job.css";
import JobCard from "./JobCard";

const Job = () => {
  const jobs = useSelector(state=> state.jobs.loadJobs);

  return (
    <section className="jobs sec-pad-top sec-pad-bottom">
      <Container>
        <div className="search mb-5">
          <input
            type="text"
            className="form-control"
            placeholder="Search with your keyword"
          />
        </div>
        <Row>
          {jobs.map((job, idx) => (
            <JobCard key={idx} job={job} />
          ))}
        </Row>
        <div className="pagination d-flex justify-content-between mt-5">
          <Button variant="danger">Prev</Button>
          <Button variant="danger">Next</Button>
        </div>
      </Container>
    </section>
  );
};

export default Job;
