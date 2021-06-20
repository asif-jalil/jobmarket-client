import React from "react";
import "./JobList.css";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useAuth } from "../../../App";
import JobListCard from "./JobListCard";

const JobList = () => {
    const { currentUser } = useAuth();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch(`https://pure-inlet-61267.herokuapp.com/jobsByEmail/${currentUser.email}`)
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
            });
    }, [currentUser.email]);

    return (
        <Container fluid>
            <h3 className="dashboard-page-title">Your Bookings</h3>
            <Row>
                {jobs.map((job) => (
                    <JobListCard key={job._id} job={job} />
                ))}
            </Row>
        </Container>
    );
};

export default JobList;
