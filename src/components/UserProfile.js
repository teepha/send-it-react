/* eslint-disable class-methods-use-this */
import React from "react";
import { Link } from "react-router-dom";

const BASE_API_URL = "https://teepha-send-it.herokuapp.com";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parcels: [],
      errMsg: "",
      search: "",
      parcelsCopy: [],
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    fetch(`${BASE_API_URL}/api/v1/users/${userId}/parcels`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then((data) => {
        console.log("some data", data, "status", data[0].status);
        if (!data.length) {
          this.setState({
            errMsg: "You do not have any Parcel delivery order yet!",
          });
        } else {
          data.sort((a, b) => a.id - b.id); // research why we cant reassign value in sort
          this.setState({ parcels: data, parcelsCopy: data });
        }
      })
      .catch(err => console.log("err occured", err));
  }

  handleInputChange = (e) => {
    const { parcelsCopy } = this.state;
    const value = e.target.value.trim().toLowerCase();
    const filteredParcels = parcelsCopy.filter(parcel => parcel.recipient_name.toLowerCase().includes(value));
    this.setState({ parcels: filteredParcels, search: value });
  };

  render() {
    const { errMsg, parcels } = this.state;
    return (
      <div>
        {errMsg ? (
          <h1 id="error-msg">{errMsg}</h1>
        ) : (
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
                <Link to="#">Create New Order</Link>
              </div>

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
                      <td className="remove-first">{parcel.pickup_location}</td>
                      <td className="remove-second">{parcel.destination}</td>
                      <td>{parcel.recipient_name}</td>
                      <td>{parcel.status.replace(/_/g, " ")}</td>
                      <td className="view">
                        <i id={parcel.id} className="far fa-eye" />
                      </td>
                      <td>
                        {parcel.status !== "cancelled" ? (
                          <Link to="#">
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
          </div>
        )}
      </div>
    );
  }
}

export default UserProfile;
