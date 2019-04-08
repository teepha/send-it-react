import React from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#app");

const CancelModal = ({
  isOpen,
  onRequestClose,
  parcel,
  handleClick,
  handleSubmit,
}) => (
    <Modal
      className="main-cancel-modal-wrapper"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      {parcel && (
        <div className="cancel-modal-content">
          <div className="cancel-close" onClick={handleClick}>
            +
          </div>
          <div>
            <h3>Cancel Order</h3>
            <div className="cancel-details">
              <form id="cancel-order-form" onSubmit={handleSubmit}>
                <p>This request will cancel the parcel order. Do you want to proceed?</p><br />
                <button className="cancel-button" id="cancel-btn">Proceed</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );

CancelModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  parcel: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default CancelModal;
