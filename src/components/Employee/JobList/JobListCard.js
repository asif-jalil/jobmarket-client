import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";

const JobListCard = ({ job }) => {
    const {
        status,
        company,
        title,
        education,
        experience,
        knowledge,
        lowestSalary,
        highestSalary,
    } = job;
    const [statusClass, setStatusClass] = useState("");

    useEffect(() => {
        if (status === "approved") {
            setStatusClass("success");
        } else if (status === "rejected") {
            setStatusClass("danger");
        } else if (status === "pending") {
            setStatusClass("warning");
        }
    }, [status]);

    return (
        <Col sm={6}>
            <Card className="single-job border-0 mb-30">
                <Card.Body>
                    <span
                        className={`d-inline-block mb-3 px-4 py-2 rounded text-capitalize alert-${statusClass}`}
                    >
                        {status}
                    </span>
                    <div className="d-flex align-items-start justify-content-between flex-wrap flex-md-nowrap">
                        <div className="my-job-info">
                            <Card.Title className="mb-3">{title}</Card.Title>
                            <Card.Subtitle className="mb-1">
                                At {company}
                            </Card.Subtitle>
                            <Card.Text className="mb-0">
                                <i className="fas fa-graduation-cap"></i>{" "}
                                {education}
                            </Card.Text>
                            <Card.Text className="mb-0">
                                <i className="fas fa-user-cog"></i> {experience}
                            </Card.Text>
                            <Card.Text className="mb-0">
                                <i className="fas fa-book-reader"></i>{" "}
                                {knowledge}
                            </Card.Text>
                            <Card.Text className="mb-0">
                                <i className="fas fa-sack-dollar"></i>{" "}
                                {lowestSalary} - {highestSalary}
                            </Card.Text>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default JobListCard;
