import React from "react";
import { Container, Col, Row, Spinner, Alert } from "react-bootstrap";
import "./ApplyJob.css";
import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../App";

const ApplyJob = () => {
    const { jobId } = useParams();
    const { currentUser } = useAuth();
    const [jobInfo, setJobInfo] = useState({});
    const [disableBtn, setDisableBtn] = useState(false);
    const [success, setSuccess] = useState("");
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        fetch(`http://localhost:5000/jobById/${jobId}`)
            .then((res) => res.json())
            .then((data) => {
                setJobInfo(data[0]);
            });
    }, [jobId]);

    const onSubmit = (formData) => {
        setDisableBtn(true);
        setLoader(true);
        setSuccess("");

        const applicationData = {
            jobInfo: jobInfo,
            applicationInfo: formData
        }
        

        fetch("http://localhost:5000/new-application", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(applicationData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data) {
                    reset();
                    setDisableBtn(false);
                    setLoader(false);
                    setSuccess("You have successfully applied for the job");
                }
            });
    };

    return (
        <Container fluid>
            <h3 className="dashboard-page-title">Apply Now</h3>
            {success && <Alert variant="success">{success}</Alert>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="">Your Name</label>
                            <input
                                defaultValue={currentUser.displayName}
                                type="text"
                                className="form-control"
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <span className="error">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="">Email</label>
                            <input
                                readOnly
                                defaultValue={currentUser.email}
                                type="email"
                                className="form-control"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="error">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="">Github Link</label>
                            <input
                                type="url"
                                className="form-control"
                                {...register("github", { required: true })}
                            />
                            {errors.github && (
                                <span className="error">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="">LinkedIn Profile</label>
                            <input
                                type="url"
                                className="form-control"
                                {...register("linkedin", { required: true })}
                            />
                            {errors.linkedin && (
                                <span className="error">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="">Best Project Live Link</label>
                            <input
                                type="url"
                                className="form-control"
                                {...register("projectLive", { required: true })}
                            />
                            {errors.projectLive && (
                                <span className="error">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="mb-3">
                            <label htmlFor="">CV Google Drive Link</label>
                            <input
                                type="url"
                                className="form-control"
                                {...register("cv", { required: true })}
                            />
                            {errors.cv && (
                                <span className="error">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </Col>
                    <Col sm={12}>
                        <button
                            type="submit"
                            disabled={disableBtn}
                            className="button main-btn main-btn-sm main-btn-transparent"
                        >
                            Apply
                        </button>
                        {loader && (
                            <Spinner
                                className="ml-4 mt-1 position-absolute"
                                animation="border"
                            ></Spinner>
                        )}
                    </Col>
                </Row>
            </form>
        </Container>
    );
};

export default ApplyJob;
