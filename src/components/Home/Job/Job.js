import React, { useEffect, useState } from "react";
import { Container, Row, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadJobs } from "../../../redux/actions/jobAction";
import "./Job.css";
import JobCard from "./JobCard";

const Job = () => {
  const jobs = useSelector((state) => state.jobs.loadJobs);
  const dispatch = useDispatch();
  const perPage = 9;
  const [visible, setVisible] = useState({ start: 0, end: perPage });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(loadJobs());
  }, [dispatch]);

  const handleNext = () => {
    // eslint-disable-next-line array-callback-return
    const filteredUsers = jobs.filter((u) => {
      if (searchTerm === "") {
        return u;
      } else if (u.title.toLowerCase().includes(searchTerm.toLowerCase()) || u.knowledge.toLowerCase().includes(searchTerm.toLowerCase())) {
        return u;
      }
    });

    if (visible.end < filteredUsers.length) {
      setVisible((prev) => {
        const load = { ...prev };
        load.start = prev.end;
        load.end = load.start + perPage;
        return load;
      });
    }
  };

  const handlePrev = () => {
    if (visible.start > 1) {
      setVisible((prev) => {
        const load = { ...prev };
        load.end = prev.start;
        load.start = load.end - perPage;
        return load;
      });
    }
  };

  return (
    <section className="jobs sec-pad-top sec-pad-bottom">
      <Container>
        <Card className="mb-5 bg-dark">
          <Card.Body>
            <input type="text" className="form-control" placeholder="Search with your keyword" onChange={(e) => setSearchTerm(e.target.value)} />
          </Card.Body>
        </Card>
        <Row>
          {jobs
            // eslint-disable-next-line array-callback-return
            .filter((j) => {
              if (searchTerm === "") {
                return j;
              } else if (j.title.toLowerCase().includes(searchTerm.toLowerCase()) || j.knowledge.toLowerCase().includes(searchTerm.toLowerCase())) {
                return j;
              }
            })
            .slice(visible.start, visible.end)
            .map((job, idx) => (
              <JobCard key={idx} job={job} />
            ))}
        </Row>
        <div className="pagination d-flex justify-content-between mt-5">
          <Button onClick={handlePrev} variant="danger">
            Prev
          </Button>
          <Button onClick={handleNext} variant="danger">
            Next
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Job;
