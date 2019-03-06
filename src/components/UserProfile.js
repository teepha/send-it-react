/* eslint-disable class-methods-use-this */
import React, {Fragment} from "react";
import { Link } from "react-router-dom";

const BASE_API_URL = "https://teepha-send-it.herokuapp.com";

// // Count number of user orders
// const status1 = data.filter(val => val.status === "ready_for_pickup").length;
// document.querySelector("#pickup-status").innerHTML = status1;

// const status2 = data.filter(val => val.status === "in_transit").length;
// document.querySelector("#transit-status").innerHTML = status2;

// const status3 = data.filter(val => val.status === "delivered").length;
// document.querySelector("#deliver-status").innerHTML = status3;

// const status4 = data.filter(val => val.status === "cancelled").length;
// document.querySelector("#cancel-status").innerHTML = status4;

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      parcels: [],
      errMsg: "",
      pickupStatus: "",
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
          this.setState({ errMsg: "You do not have any Parcel delivery order yet!" });
        } else {
          data.sort((a, b) => a.id - b.id);
          this.setState({ parcels: data });
          // this.setState({ pickupStatus: data.status });
        }
      })
      .catch(err => console.log("err occured", err));
  }

  render() {
    return (
      <div>
        {this.state.errMsg ? (
          <h1 id="error-msg">{this.state.errMsg}</h1>
        ) : (
          <div className="main-content">
            <div className="user-profile-wrapper">
              <div className="order-count">
                <div>
                  Ready for Pickup: <span id="pickup-status">{this.state.pickupStatus}</span>
                </div>
                <div className="status-count">
                  In-Transit: <span id="transit-status" />
                </div>
                <div className="status-count">
                  Delivered: <span id="deliver-status" />
                </div>
                <div className="status-count">
                  Cancelled: <span id="cancel-status" />
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
                  />
                  <button className="btn" type="submit">
                    <i className="fa fa-search" />
                  </button>
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
                  {this.state.parcels.map((parcel, i) => (
                      <tr key={i}>
                        <td>{parcel.id}</td>
                        <td className="remove-second">{parcel.date.slice(0, 10)}</td>
                        <td className="remove-first">{parcel.pickup_location}</td>
                        <td className="remove-second">{parcel.destination}</td>
                        <td>{parcel.recipient_name}</td>
                        <td>{parcel.status.replace(/_/g, " ")}</td>
                        <td className="view"><i id={parcel.id} className="far fa-eye"></i></td>
                        <td>{parcel.status !== "cancelled" ? <Link to="#"><i id={parcel.id} className="far fa-edit"></i></Link> : ""}</td>
                        <td className="cancel">{parcel.status !== "cancelled" ? <i id={parcel.id} className="fas fa-times"></i> : ""}</td>
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
