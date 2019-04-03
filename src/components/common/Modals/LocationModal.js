import React from "react";
import Spinner from "react-md-spinner";
import Modal from "react-modal";
import PropTypes from "prop-types";

Modal.setAppElement("#app");

const LocationModal = ({
  isOpen,
  onRequestClose,
  parcel,
  handleClick,
  handleSubmit,
  handleChange
}) => (
  <Modal
    className="main-location-modal-wrapper"
    isOpen={isOpen}
    onRequestClose={onRequestClose}
  >
    {parcel && (
      <div className="location-modal-content">
        <div className="location-close" onClick={handleClick}>
          +
        </div>
        <h3>Change Current Location</h3>
        <div className="cancel-details">
          <form onSubmit={handleSubmit}>
            <input
              name="location"
              type="text"
              disabled
              value={!parcel.present_location ? "" : parcel.present_location}
            />
            <input
              name="newLocation"
              type="text"
              placeholder="New Location"
              onChange={handleChange}
            />
            <button className="location-btn" id="location-button">
              Continue
            </button>
          </form>
        </div>
      </div>
    )}
  </Modal>
);

LocationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  parcel: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default LocationModal;
