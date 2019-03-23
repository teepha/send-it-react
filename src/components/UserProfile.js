import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getUserParcels, getSingleParcel, cancelParcelOrder } from "../actions/parcelsActions";
import { capitalizeStatus } from "../utils";

Modal.setAppElement("#app");

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parcels: [],
      noParcelsErrMsg: "",
      cancelModalIsOpen: "",
      search: "",
      parcelsCopy: [],
      viewModalIsOpen: false,
      parcelToView: {},
      cancelModalIsOpen: false,
      parcelToCancelId: "",
    };
  }

  componentDidMount() {
    this.props.getUserParcels();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.errors.length && this.props.errors !== nextProps.errors) {
      const errorString = nextProps.errors.join("\n");
      this.setState({ noParcelsErrMsg: errorString });
    } else if (this.props.parcels !== nextProps.parcels) {
      this.setState({
        parcels: nextProps.parcels,
        parcelsCopy: nextProps.parcels,
      });
    }
    return true;
  }


  handleInputChange = e => {
    const { parcelsCopy } = this.state;
    const value = e.target.value.trim().toLowerCase();
    const filteredParcels = parcelsCopy.filter(parcel =>
      parcel.recipient_name.toLowerCase().includes(value)
    );
    this.setState({ parcels: filteredParcels, search: value });
  };

  handleOpenViewModal = event => {
    const id = parseInt(event.target.id, 10);
    const findParcel = this.state.parcels.find(parcel => parcel.id === id);
    this.setState({ viewModalIsOpen: true, parcelToView: findParcel });
  };

  handleCloseViewModal = () => {
    this.setState({ viewModalIsOpen: false });
  };

  handleCancelOrder = (e) => {
    e.preventDefault();
    this.props.cancelParcelOrder(this.state.parcelToCancelId);
    this.setState({ cancelModalIsOpen: false })
    toast.success("Parcel Order Cancelled Successfully!");
  }

  handleOpenCancelModal = event => {
    const id = parseInt(event.target.id, 10);
    this.setState({
      cancelModalIsOpen: true,
      parcelToCancelId: id,
    });
  };

  handleCloseCancelModal = () => {
    this.setState({ cancelModalIsOpen: false });
  };

  render() {
    const { noParcelsErrMsg, cancelErrMsg, parcels, parcelToView } = this.state;
    return (
      <div>
        <div className="main-content">
          <div className="user-profile-wrapper">
            <div className="order-count">
              <div>
                Ready for Pickup:
                <span id="pickup-status">
                  {
                    parcels.filter(
                      parcel => parcel.status === "ready_for_pickup"
                    ).length
                  }
                </span>
              </div>
              <div className="status-count">
                In-Transit:
                <span id="transit-status">
                  {
                    parcels.filter(parcel => parcel.status === "in_transit")
                      .length
                  }
                </span>
              </div>
              <div className="status-count">
                Delivered:
                <span id="deliver-status">
                  {
                    parcels.filter(parcel => parcel.status === "delivered")
                      .length
                  }
                </span>
              </div>
              <div className="status-count">
                Cancelled:
                <span id="cancel-status">
                  {
                    parcels.filter(parcel => parcel.status === "cancelled")
                      .length
                  }
                </span>
              </div>
            </div>

            <div className="create-order-btn">
              <Link to="/create-order">Create New Order</Link>
            </div>
            {noParcelsErrMsg ? (
              <h1 id="error-msg">{noParcelsErrMsg}</h1>
            ) : (
                <div>
                  <div className="table-top">
                    <span className="table-title">My Orders</span>
                    <div className="search-bar">
                      <input
                        id="search-name"
                        type="text"
                        placeholder="Enter Recipient Name..."
                        name="search"
                        value={this.state.search}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <table className="orders">
                    <thead>
                      <tr>
                        <th scope="row">ID</th>
                        <th scope="row" className="remove-second">
                          Date
                      </th>
                        <th scope="row" className="remove-first">
                          Pick Up Location
                      </th>
                        <th scope="row" className="remove-second">
                          Destination
                      </th>
                        <th scope="row">Recipient Name</th>
                        <th scope="row">Status</th>
                        <th scope="row" />
                        <th scope="row" />
                        <th scope="row" />
                      </tr>
                    </thead>
                    <tbody className="orders-data">
                      {parcels.map((parcel, i) => (
                        <tr key={i}>
                          <td>{parcel.id}</td>
                          <td className="remove-second">
                            {parcel.date.slice(0, 10)}
                          </td>
                          <td className="remove-first">
                            {parcel.pickup_location}
                          </td>
                          <td className="remove-second">{parcel.destination}</td>
                          <td>{parcel.recipient_name}</td>
                          <td>
                            {capitalizeStatus(parcel.status.replace(/_/g, " "))}
                          </td>
                          <td className="view">
                            <i
                              id={parcel.id}
                              className="far fa-eye"
                              onClick={this.handleOpenViewModal}
                            />
                          </td>
                          <td>
                            {parcel.status !== "cancelled" &&
                              parcel.status !== "delivered" ? (
                                <Link to={`/parcels/${parcel.id}`}>
                                  <i id={parcel.id} className="far fa-edit" />
                                </Link>
                              ) : (
                                ""
                              )}
                          </td>
                          <td className="cancel">
                            {parcel.status !== "cancelled" &&
                              parcel.status !== "delivered" ? (
                                <i id={parcel.id} className="fas fa-times" onClick={this.handleOpenCancelModal} />
                              ) : (
                                ""
                              )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* View Modal */}
                  <Modal
                    className="main-view-modal-wrapper"
                    isOpen={this.state.viewModalIsOpen}
                    onRequestClose={this.handleCloseViewModal}
                  >
                    {parcelToView && (
                      <div className="view-modal-content">
                        <div className="view-close" onClick={this.handleCloseViewModal}>
                          +
                      </div>
                        <h3>View Order</h3>
                        <div className="view-details">
                          <p>ID: {parcelToView.id}</p>
                          <p>User ID: {parcelToView.user_id}</p>
                          <p>
                            Date:{" "}
                            {parcelToView.date && parcelToView.date.slice(0, 10)}
                          </p>
                          <p>Pick Up Location: {parcelToView.pickup_location}</p>
                          <p>Destination: {parcelToView.destination}</p>
                          <p>Recipient Name: {parcelToView.recipient_name}</p>
                          <p>
                            Recipient Phone Number: {parcelToView.recipient_phone}
                          </p>
                          <p>
                            Status:{" "}
                            {parcelToView.status &&
                              capitalizeStatus(
                                parcelToView.status.replace(/_/g, " ")
                              )}
                          </p>
                          <p>Present Location: {parcelToView.present_location}</p>
                        </div>
                      </div>
                    )}
                  </Modal>

                  {/* Cancel Modal */}
                  <Modal
                    className="main-cancel-modal-wrapper"
                    isOpen={this.state.cancelModalIsOpen}
                    onRequestClose={this.handleCloseCancelModal}
                  >
                    {parcelToView && (
                      <div className="cancel-modal-content">
                        <div className="cancel-close" onClick={this.handleCloseCancelModal}>
                          +
                      </div>
                        <h3>Cancel Order</h3>
                        <div className="cancel-details">
                          <form id="cancel-order-form" onSubmit={this.handleCancelOrder}>
                            <p>This request will cancel the parcel order. Do you want to proceed?</p><br />
                            <button className="cancel-button" id="cancel-btn">Proceed</button>
                            <h4 id="cancel-error-msg">{cancelErrMsg}</h4>
                          </form>
                        </div>
                      </div>
                    )}
                  </Modal>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    parcels: store.parcels.data,
    errors: store.parcels.errors,
  };
};

const mapDispatchToProps = () => ({
  getUserParcels,
  getSingleParcel,
  cancelParcelOrder,
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps()
)(UserProfile));
