import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Spinner, Table, Button, Modal } from "react-bootstrap";
import "./JobList.css";
import JobListRow from "./JobListRow";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [statusUpdate, setStatusUpdate] = useState(false);
    const [loader, setLoader] = useState(true);
    const [show, setShow] = useState(false);
    const [modalData, setModalData] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (data) => {
        setModalData(data);
        setShow(true);
    };

    const handleStatus = (status, id) => {
        fetch(`https://pure-inlet-61267.herokuapp.com/statusUpdate/${id}?status=${status}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    setStatusUpdate(!statusUpdate);
                }
            });
    };

    useEffect(() => {
        setLoader(true);
        fetch("https://pure-inlet-61267.herokuapp.com/jobs")
            .then((res) => res.json())
            .then((data) => {
                const reversedData = data.reverse()
                setJobs(reversedData);
                setLoader(false);
            });
    }, [statusUpdate]);

    return (
        <Container fluid>
            <h3 className="dashboard-page-title">All Bookings</h3>
            <Table borderless hover responsive className="job-list">
                <thead>
                    <tr>
                        <th>Posted By</th>
                        <th>Company</th>
                        <th>Designation</th>
                        <th>Status</th>
                        <th>Action</th>
                        <th>Full View</th>
                    </tr>
                </thead>
                <tbody>
                    {loader ? (
                        <Spinner animation="border"></Spinner>
                    ) : (
                        jobs.map((job) => (
                            <JobListRow
                                key={job._id}
                                job={job}
                                handleStatus={handleStatus}
                                handleShow={handleShow}
                            />
                        ))
                    )}
                </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Job Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <b>Designation:</b> {modalData.title}
                    </p>
                    <p>
                        <b>Company:</b> {modalData.company}
                    </p>
                    <p>
                        <b>PostedBy:</b> {modalData.postedBy}
                    </p>
                    <p>
                        <b>Email:</b> {modalData.email}
                    </p>
                    <p>
                        <b>Education:</b> {modalData.education}
                    </p>
                    <p>
                        <b>Experience:</b> {modalData.experience}
                    </p>
                    <p>
                        <b>Knowledge:</b> {modalData.knowledge}
                    </p>
                    <p>
                        <b>Salary Range:</b> ${modalData.lowestSalary} -{" "}
                        ${modalData.highestSalary}
                    </p>
                    <p>
                        <b>Status:</b> {modalData.status}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default JobList;
