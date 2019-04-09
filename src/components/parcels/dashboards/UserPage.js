import React from "react";
import Spinner from "react-md-spinner";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  getUserParcels,
  getSingleParcel,
  cancelParcelOrder
} from "../../../actions/parcelsActions";
import { capitalizeStatus } from "../../../utils";
import CancelModal from "../../common/Modals/CancelModal";
import ViewModal from "../../common/Modals/ViewModal";

class UserProfile extends React.Component {
  state = {
    parcels: [],
    noParcelsErrMsg: "",
    cancelModalIsOpen: "",
    search: "",
    parcelsCopy: [],
    viewModalIsOpen: false,
    parcelToView: {},
    cancelModalIsOpen: false,
    parcelToCancelId: ""
  };

  componentDidMount() {
    const { user } = this.props;
    const userId = user.id;
    this.props.getUserParcels(userId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.error !== nextProps.error) {
      const errorString = nextProps.error;
      this.setState({ noParcelsErrMsg: errorString });
    } else if (this.props.parcels !== nextProps.parcels) {
      this.setState({
        parcels: nextProps.parcels,
        parcelsCopy: nextProps.parcels
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

  handleCancelOrder = e => {
    e.preventDefault();
    this.props.cancelParcelOrder(this.state.parcelToCancelId);
    this.setState({ cancelModalIsOpen: false });
    toast.success("Parcel Order Cancelled Successfully!");
  };

  handleOpenCancelModal = event => {
    const id = parseInt(event.target.id, 10);
    this.setState({
      cancelModalIsOpen: true,
      parcelToCancelId: id
    });
  };

  handleCloseCancelModal = () => {
    this.setState({ cancelModalIsOpen: false });
  };

  render() {
    const { noParcelsErrMsg, parcels, parcelToView } = this.state;
    const { fetching } = this.props;
    return fetching ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15%",
          marginBottom: "15%"
        }}
      >
        <Spinner singleColor="blue" size={70} />
      </div>
    ) : (
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
                            <i
                              id={parcel.id}
                              className="fas fa-times"
                              onClick={this.handleOpenCancelModal}
                            />
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* View Modal */}
                <ViewModal
                  isOpen={this.state.viewModalIsOpen}
                  onRequestClose={this.handleCloseViewModal}
                  parcel={parcelToView}
                  handleClick={this.handleCloseViewModal}
                />

                {/* Cancel Modal */}
                <CancelModal
                  isOpen={this.state.cancelModalIsOpen}
                  onRequestClose={this.handleCloseCancelModal}
                  parcel={parcelToView}
                  handleClick={this.handleCloseCancelModal}
                  handleSubmit={this.handleCancelOrder}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, parcels }) => {
  return {
    fetching: parcels.isFetching,
    user: user.userData,
    parcels: parcels.data,
    error: parcels.error
  };
};

const mapDispatchToProps = () => ({
  getUserParcels,
  getSingleParcel,
  cancelParcelOrder
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps()
  )(UserProfile)
);
