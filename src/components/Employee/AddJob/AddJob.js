import React from "react";
import { useState } from "react";
import { Col, Container, Row, Alert, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../App";
import "./AddJob.css";

const AddJob = () => {
    const [disableBtn, setDisableBtn] = useState(false);
    const [success, setSuccess] = useState("");
    const [loader, setLoader] = useState(false);
    const { currentUser } = useAuth();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setDisableBtn(true);
        setLoader(true);
        setSuccess("");

        const formData = {
            ...data,
            email: currentUser.email,
            status: 'pending'
        }

        fetch("http://localhost:5000/add-job", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                reset();
                setDisableBtn(false);
                setLoader(false);
                setSuccess("You have successfully added job");
            });
    };

    return (
        <Container fluid>
            <h3 className="dashboard-page-title">Add A Job</h3>
            <div className="position-relative add-boat">
                {success && <Alert variant="success">{success}</Alert>}
                <form
                    className="add-job-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Row>
                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="">Posted By</label>
                                <input
                                    defaultValue={currentUser.displayName}
                                    type="text"
                                    className="form-control"
                                    {...register("postedBy", {
                                        required: true,
                                    })}
                                />
                                {errors.postedBy && (
                                    <polyline className="error">
                                        This field is required
                                    </polyline>
                                )}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="">Company Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("company", { required: true })}
                                />
                                {errors.company && (
                                    <p className="error">
                                        This field is required
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="">Job Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("title", { required: true })}
                                />
                                {errors.title && (
                                    <p className="error">
                                        This field is required
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="">Education</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("education", {
                                        required: true,
                                    })}
                                />
                                {errors.education && (
                                    <p className="error">
                                        This field is required
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="">Experience</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("experience", {
                                        required: true,
                                    })}
                                />
                                {errors.experience && (
                                    <p className="error">
                                        This field is required
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="">Required Knowledge <small>(Separated By Comma)</small></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("knowledge", {
                                        required: true,
                                    })}
                                />
                                {errors.knowledge && (
                                    <p className="error">
                                        This field is required
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="">Salary (Lowest in $)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("lowestSalary", {
                                        required: true,
                                    })}
                                />
                                {errors.lowestSalary && (
                                    <p className="error">
                                        This field is required
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col md={6}>
                            <div className="mb-3">
                                <label htmlFor="">Salary (Highest in $)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("highestSalary", {
                                        required: true,
                                    })}
                                />
                                {errors.highestSalary && (
                                    <p className="error">
                                        This field is required
                                    </p>
                                )}
                            </div>
                        </Col>

                        <Col sm={12}>
                            <button
                                type="submit"
                                disabled={disableBtn}
                                className="button main-btn main-btn-sm main-btn-transparent"
                            >
                                Add
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
            </div>
        </Container>
    );
};

export default AddJob;
