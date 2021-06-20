import React from "react";
import doneIcon from "../../../images/done.svg";
import ongoingIcon from "../../../images/process.svg";
import pendingIcon from "../../../images/clock.svg";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const BookingListRow = ({ booking, handleStatus }) => {
  const { _id, name, email, boat, day, cost, status } = booking;

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{boat}</td>
      <td>{day}</td>
      <td>${cost}</td>
      <td className="text-capitalize">{status}</td>
      <td>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-1`}>Pending</Tooltip>}>
          <span onClick={() => handleStatus("pending", _id)} className="mx-1 action">
            <img src={pendingIcon} width="20px" alt="" />
          </span>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-1`}>Ongoing</Tooltip>}>
          <span onClick={() => handleStatus("ongoing", _id)} className="mx-1 action">
            <img src={ongoingIcon} width="20px" alt="" />
          </span>
        </OverlayTrigger>
        <OverlayTrigger overlay={<Tooltip id={`tooltip-1`}>Done</Tooltip>}>
          <span onClick={() => handleStatus("done", _id)} className="mx-1 action">
            <img src={doneIcon} width="20px" alt="" />
          </span>
        </OverlayTrigger>
      </td>
    </tr>
  );
};

export default BookingListRow;
