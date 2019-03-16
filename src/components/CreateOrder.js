import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createParcelOrder } from "../actions/parcelsActions";

class CreateOrder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickupLocation: "",
      destination: "",
      recipientName: "",
      recipientPhone: "",
    };
  }

  handleCreateOrder = (e) => {
    e.preventDefault();
    const {
      pickupLocation,
      destination,
      recipientName,
      recipientPhone,
    } = this.state;
    this.props
      .createParcelOrder(
        pickupLocation,
        destination,
        recipientName,
        recipientPhone,
      )
      .then((res) => {
        if (!res.id) {
          return res;
        }
        this.props.history.push("/user-profile");
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="main-create-order-page">
        <div className="create-order-wrapper">
          <div className="create-order-page">
            <Link to="./user-profile">
              <i className="fas fa-arrow-left" />
            </Link>
            <h1>New Order</h1>
            <form onSubmit={this.handleCreateOrder} id="create-order-form">
              <label>Pick Up Location </label>
              <input
                name="pickupLocation"
                type="text"
                value={this.state.pickup_location}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Destination </label>
              <input
                name="destination"
                type="text"
                value={this.state.destination}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Recipient Name </label>
              <input
                name="recipientName"
                type="text"
                value={this.state.recipient_name}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Recipient Phone Number </label>
              <input
                name="recipientPhone"
                type="text"
                value={this.state.recipient_phone}
                onChange={this.handleInputChange}
              />
              <br />
              <button className="button">Create Order</button>
              <h4 id="error-msg" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  parcel: state.parcel,
});

const mapDispatchToProps = {
  createParcelOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateOrder);
