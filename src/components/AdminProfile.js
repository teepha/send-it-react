import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { getAllParcels, updateParcelStatus, updateParcelLocation } from "../actions/parcelsActions";
import { capitalizeStatus } from "../utils";

Modal.setAppElement("#app");

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parcels: [],
      noParcelsErrMsg: "",
      search: "",
      parcelsCopy: [],
      viewModalIsOpen: false,
      parcelToView: {},
      locationModalIsOpen: false,
      parcelToUpdate: "",
      parcelToUpdateId: "",
      newLocation: "",
      presentLocation: ""
    };
  }

  componentDidMount() {
    this.props.getAllParcels();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.error && this.props.error !== nextProps.error) {
      const errorString = nextProps.error;
      this.setState({ noParcelsErrMsg: errorString });
    } else if (this.props.parcels !== nextProps.parcels) {
      this.setState({
        parcels: nextProps.parcels,
        parcelsCopy: nextProps.parcels,
      });
    }
    return true;
  }

  handleInputChange = (e) => {
    const { parcelsCopy } = this.state;
    const value = e.target.value.trim();
    const filteredParcels = parcelsCopy.filter(
      parcel => parcel.user_id.toString().includes(value),
    );
    this.setState({ parcels: filteredParcels, search: value });
  };

  handleStatusChange = (e) => {
    const { id, value } = e.target;
    this.props.updateParcelStatus(id, value);
    toast.success("Parcel Status Updated Successfully!");
    this.props.history.push("/admin-profile");
  };

  handleOpenViewModal = event => {
    const id = parseInt(event.target.id, 10);
    const findParcel = this.state.parcels.find(parcel => parcel.id === id);
    this.setState({ viewModalIsOpen: true, parcelToView: findParcel });
  };

  handleCloseViewModal = () => {
    this.setState({ viewModalIsOpen: false });
  };

  handleOpenLocationModal = event => {
    const id = parseInt(event.target.id, 10);
    const findParcel = this.state.parcels.find(parcel => parcel.id === id)
    this.setState({
      locationModalIsOpen: true,
      parcelToUpdate: findParcel,
      parcelToUpdateId: id,
    });
  };

  handleLocationInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLocationUpdate = (e) => {
    e.preventDefault();
    const { parcelToUpdateId, newLocation } = this.state;
    this.props.updateParcelLocation(parcelToUpdateId, newLocation);
    this.setState({ locationModalIsOpen: false })
    toast.success("Parcel Location Successfully Updated!");
    this.props.history.push("/admin-profile");
  }

  handleCloseLocationModal = () => {
    this.setState({ locationModalIsOpen: false });
  };

  render() {
    const { noParcelsErrMsg, parcels, parcelToView, parcelToUpdate } = this.state;
    return (
      <div>
        {noParcelsErrMsg ? (
          <h1 id="error-msg">{noParcelsErrMsg}</h1>
        ) : (
            <div className="main-content">
              <div className="admin-profile-wrapper">
                <div className="order-count">
                  <div>
                    Ready for Pickup:{" "}
                    <span id="pickup-status">
                      {
                        parcels.filter(
                          parcel => parcel.status === "ready_for_pickup",
                        ).length
                      }
                    </span>
                  </div>
                  <div className="status-count">
                    In-Transit:{" "}
                    <span id="transit-status">
                      {
                        parcels.filter(parcel => parcel.status === "in_transit")
                          .length
                      }
                    </span>
                  </div>
                  <div className="status-count">
                    Delivered:{" "}
                    <span id="deliver-status">
                      {
                        parcels.filter(parcel => parcel.status === "delivered")
                          .length
                      }
                    </span>
                  </div>
                  <div className="status-count">
                    Cancelled:{" "}
                    <span id="cancel-status">
                      {
                        parcels.filter(parcel => parcel.status === "cancelled")
                          .length
                      }
                    </span>
                  </div>
                </div>

                <div className="table-top">
                  <span className="table-title">All Orders</span>
                  <div className="search-bar">
                    <input
                      id="search-user-id"
                      type="text"
                      placeholder="Enter User ID..."
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
                      <th scope="row" className="remove-first">
                        User ID
                    </th>
                      <th scope="row" className="remove-second">
                        Date
                    </th>
                      <th scope="row" className="remove-first">
                        Pick Up Location
                    </th>
                      <th scope="row">Destination</th>
                      <th scope="row" className="remove-second">
                        Recipient Name
                    </th>
                      <th scope="row">Status</th>
                      <th scope="row">Present Location</th>
                      <th scope="row" />
                      <th scope="row" />
                    </tr>
                  </thead>
                  <tbody className="orders-data">
                    {parcels.map((parcel, i) => (
                      <tr key={i}>
                        <td>{parcel.id}</td>
                        <td className="remove-first">{parcel.user_id}</td>
                        <td className="remove-second">
                          {parcel.date.slice(0, 10)}
                        </td>
                        <td className="remove-first">{parcel.pickup_location}</td>
                        <td>{parcel.destination}</td>
                        <td className="remove-second">{parcel.recipient_name}</td>
                        <td>
                          <select
                            id={parcel.id}
                            disabled={parcel.status === "cancelled" || parcel.status === "delivered"}
                            defaultValue={parcel.status}
                            name="status"
                            className="status"
                            onChange={this.handleStatusChange}
                          >
                            <option disabled value="cancelled">
                              Cancelled
                          </option>
                            <option value="ready_for_pickup">
                              Ready For Pickup
                          </option>
                            <option value="in_transit">In-Transit</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td>{parcel.present_location}</td>
                        <td className="view">
                          <i id={parcel.id} className="far fa-eye" onClick={this.handleOpenViewModal} />
                        </td>
                        <td className="edit">
                          {parcel.status !== "cancelled"
                            && parcel.status !== "delivered" ? (
                              <i id={parcel.id} className="far fa-edit" onClick={this.handleOpenLocationModal} />
                            ) : (
                              ""
                            )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

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

                {/* Update Location Modal */}

                <Modal
                  className="main-location-modal-wrapper"
                  isOpen={this.state.locationModalIsOpen}
                  onRequestClose={this.handleCloseLocationModal}
                >
                  {parcelToUpdate && (
                    <div className="location-modal-content">
                      <div className="location-close" onClick={this.handleCloseLocationModal}>
                        +
                      </div>
                      <h3>Change Current Location</h3>
                      <div className="cancel-details">
                        <form onSubmit={this.handleLocationUpdate}>
                          <input name="location" type="text" disabled value={!parcelToUpdate.present_location ? "" : parcelToUpdate.present_location} />
                          <input name="newLocation" type="text" placeholder="New Location" onChange={this.handleLocationInputChange} />
                          <button className="location-btn" id="location-button">Continue</button>
                          <h4 id="location-error-msg"></h4>
                        </form>
                      </div>
                    </div>
                  )}
                </Modal>
              </div>
            </div>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    parcels: state.parcels.data,
    errors: state.parcels.error,
  };
};

const mapDispatchToProps = () => ({
  getAllParcels,
  updateParcelStatus,
  updateParcelLocation
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps(),
)(AdminProfile));
