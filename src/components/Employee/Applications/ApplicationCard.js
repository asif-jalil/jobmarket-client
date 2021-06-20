import React from "react";
import { Card, Col } from "react-bootstrap";

const ApplicationCard = ({ application }) => {
    const { jobInfo, applicationInfo } = application;
    return (
        <Col sm={6}>
            <Card className="single-application border-0 mb-30">
                <Card.Body>
                    <div className="d-flex align-items-start justify-content-between flex-wrap flex-md-nowrap">
                        <div className="my-application-info">
                            <div className="mb-4">
                                <Card.Title>
                                    Candidate Submitted Info
                                </Card.Title>
                                <Card.Text className="mb-0">
                                    Name: {applicationInfo.name}
                                </Card.Text>
                                <Card.Text className="mb-0">
                                    Github:{" "}
                                    <a
                                        href={applicationInfo.github}
                                        className="text-danger"
                                        target="_black"
                                    >
                                        {applicationInfo.github}
                                    </a>
                                </Card.Text>
                                <Card.Text className="mb-0">
                                    LinkedIn:{" "}
                                    <a
                                        href={applicationInfo.linkedin}
                                        className="text-danger"
                                        target="_black"
                                    >
                                        {applicationInfo.linkedin}
                                    </a>
                                </Card.Text>
                                <Card.Text className="mb-0">
                                    Project:{" "}
                                    <a
                                        href={applicationInfo.projectLive}
                                        className="text-danger"
                                        target="_black"
                                    >
                                        {applicationInfo.projectLive}
                                    </a>
                                </Card.Text>
                                <Card.Text className="mb-0">
                                    CV:{" "}
                                    <a
                                        href={applicationInfo.cv}
                                        className="text-danger"
                                        target="_black"
                                    >
                                        {applicationInfo.cv}
                                    </a>
                                </Card.Text>
                            </div>
                            <hr />
                            <Card.Subtitle className="mb-3">
                                Your Job post for {jobInfo.title} at {jobInfo.company}
                            </Card.Subtitle>
                            <Card.Text className="mb-0">
                                <i className="fas fa-graduation-cap"></i>{" "}
                                {jobInfo.education}
                            </Card.Text>
                            <Card.Text className="mb-0">
                                <i className="fas fa-user-cog"></i>{" "}
                                {jobInfo.experience}
                            </Card.Text>
                            <Card.Text className="mb-0">
                                <i className="fas fa-book-reader"></i>{" "}
                                {jobInfo.knowledge}
                            </Card.Text>
                            <Card.Text className="mb-0">
                                <i className="fas fa-sack-dollar"></i>{" "}
                                {jobInfo.lowestSalary} - {jobInfo.highestSalary}
                            </Card.Text>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ApplicationCard;
