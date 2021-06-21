import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
    const {
        company,
        title,
        education,
        experience,
        knowledge,
        lowestSalary,
        highestSalary,
    } = job;

    return (
        <Col md={4} className="mb-30">
            <Card className="border-0 shadow-sm">
                <Card.Body>
                    <Card.Title className="mb-3">{title}</Card.Title>
                    <Card.Subtitle className="mb-1">At {company}</Card.Subtitle>
                    <Card.Text className="mb-0">
                        <i className="fas fa-graduation-cap"></i> Education: {education}
                    </Card.Text>
                    <Card.Text className="mb-0">
                        <i className="fas fa-user-cog"></i> Experience: {experience}
                    </Card.Text>
                    <Card.Text className="mb-0">
                        <i className="fas fa-book-reader"></i> Required Knowledge: {knowledge}
                    </Card.Text>
                    <Card.Text className="mb-4">
                        <i className="fas fa-sack-dollar"></i> Salary Range: ${lowestSalary} -{" "}
                        ${highestSalary}
                    </Card.Text>
                    <Link to={`/dashboard/apply/${job._id}`} className="btn btn-danger btn-sm">Apply Now</Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default JobCard;
