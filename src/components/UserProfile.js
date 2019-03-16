import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { getUserParcels } from "../actions/parcelsActions";
import { capitalizeStatus } from "../utils";

class UserProfile extends React.Component {
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
      .getUserParcels()
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
    const value = e.target.value.trim().toLowerCase();
    const filteredParcels = parcelsCopy.filter(parcel => parcel.recipient_name.toLowerCase().includes(value));
    this.setState({ parcels: filteredParcels, search: value });
  };

  render() {
    const { noParcelsErrMsg, parcels } = this.state;
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
                      parcel => parcel.status === "ready_for_pickup",
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
                          <i id={parcel.id} className="far fa-eye" />
                        </td>
                        <td>
                          {parcel.status !== "cancelled" ? (
                            <Link to={`/parcels/${parcel.id}`}>
                              <i id={parcel.id} className="far fa-edit" />
                            </Link>
                          ) : (
                            ""
                          )}
                        </td>
                        <td className="cancel">
                          {parcel.status !== "cancelled" ? (
                            <i id={parcel.id} className="fas fa-times" />
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
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
  getUserParcels,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(UserProfile);
