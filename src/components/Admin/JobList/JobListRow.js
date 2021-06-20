import React from "react";
import approvedIcon from "../../../images/done.svg";
import rejectedIcon from "../../../images/rejected.svg";
import pendingIcon from "../../../images/clock.svg";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const JobListRow = ({ job, handleStatus, handleShow }) => {
    const {
        _id,
        status,
        postedBy,
        company,
        title,
    } = job;

    return (
        <tr>
            <td>{postedBy}</td>
            <td>{company}</td>
            <td>{title}</td>
            <td className="text-capitalize">{status}</td>
            <td>
                <OverlayTrigger
                    overlay={<Tooltip id={`tooltip-1`}>Pending</Tooltip>}
                >
                    <span
                        onClick={() => handleStatus("pending", _id)}
                        className="mx-1 action"
                    >
                        <img src={pendingIcon} width="20px" alt="" />
                    </span>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={<Tooltip id={`tooltip-1`}>Rejected</Tooltip>}
                >
                    <span
                        onClick={() => handleStatus("rejected", _id)}
                        className="mx-1 action"
                    >
                        <img src={rejectedIcon} width="20px" alt="" />
                    </span>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={<Tooltip id={`tooltip-1`}>Approved</Tooltip>}
                >
                    <span
                        onClick={() => handleStatus("approved", _id)}
                        className="mx-1 action"
                    >
                        <img src={approvedIcon} width="20px" alt="" />
                    </span>
                </OverlayTrigger>
            </td>
            <td>
                <button onClick={()=>handleShow(job)} className="btn btn-sm btn-danger">View</button>
            </td>
        </tr>
    );
};

export default JobListRow;
