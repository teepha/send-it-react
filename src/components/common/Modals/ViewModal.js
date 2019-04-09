import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { capitalizeStatus } from "../../../utils";

Modal.setAppElement("#app");

const ViewModal = ({
  isOpen,
  onRequestClose,
  parcel,
  handleClick,
}) => (
  <Modal
    className="main-view-modal-wrapper"
    isOpen={isOpen}
    onRequestClose={onRequestClose}
  >
    {parcel && (
      <div className="view-modal-content">
        <div className="view-close" onClick={handleClick}>
          +
                      </div>
        <h3>View Order</h3>
        <div className="view-details">
          <p>ID: {parcel.id}</p>
          <p>User ID: {parcel.user_id}</p>
          <p>
            Date:{" "}
            {parcel.date && parcel.date.slice(0, 10)}
          </p>
          <p>Pick Up Location: {parcel.pickup_location}</p>
          <p>Destination: {parcel.destination}</p>
          <p>Recipient Name: {parcel.recipient_name}</p>
          <p>
            Recipient Phone Number: {parcel.recipient_phone}
          </p>
          <p>
            Status:{" "}
            {parcel.status &&
              capitalizeStatus(
                parcel.status.replace(/_/g, " ")
              )}
          </p>
          <p>Present Location: {parcel.present_location}</p>
        </div>
      </div>
    )}
  </Modal>

);

ViewModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  parcel: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
}

export default ViewModal;
