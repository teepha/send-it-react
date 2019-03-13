/* eslint-disable class-methods-use-this */
import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getAllParcels, updateParcelStatus } from "../actions/parcelsActions";

class AdminProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parcels: [],
      noParcelsErrMsg: "",
      search: "",
      parcelsCopy: [],
    };
  }

  componentDidMount() {
    this.props
      .getAllParcels()
      .then((res) => {
        this.setState({ noParcelsErrMsg: res.msg });
      })
      .catch((err) => {
        toast.error("Sorry a server error occured!");
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
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
    const filteredParcels = parcelsCopy.filter(parcel => parcel.user_id.toString().includes(value));
    this.setState({ parcels: filteredParcels, search: value });
  };

  handleStatusChange = (e) => {
    const { id, value } = e.target;
    this.props.updateParcelStatus(id, value);
  };

  render() {
    const { noParcelsErrMsg, parcels } = this.state;
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
                          disabled={parcel.status === "cancelled"}
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
                        <i id={parcel.id} className="far fa-eye" />
                      </td>
                      <td className="edit">
                        <i id={parcel.id} className="far fa-edit" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    parcels: state.parcels,
  };
};

const mapDispatchToProps = () => ({
  getAllParcels,
  updateParcelStatus,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(AdminProfile);
