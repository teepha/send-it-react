import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
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

  shouldComponentUpdate(nextProps) {
    if (this.props !== nextProps) {
      if (nextProps.errors.length) {
        const errorString = nextProps.errors.join("\n");
        toast.warn(errorString);
      } else {
        toast.success("Parcel Order Created Successfully!");
        this.props.history.push("/user-profile");
      }
    }
    return true;
  }

  handleCreateOrder = (e) => {
    e.preventDefault();
    const {
      pickupLocation,
      destination,
      recipientName,
      recipientPhone,
    } = this.state;
    this.props.createParcelOrder(
      pickupLocation,
      destination,
      recipientName,
      recipientPhone,
    );
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
                required
                pattern="[a-zA-Z0-9_&-]+([ ]?[a-zA-Z0-9_&-]+)*"
                minLength="10"
                name="pickupLocation"
                type="text"
                value={this.state.pickup_location}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Destination </label>
              <input
                required
                pattern="[a-zA-Z0-9_&-]+([ ]?[a-zA-Z0-9_&-]+)*"
                minLength="10"
                name="destination"
                type="text"
                value={this.state.destination}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Recipient Name </label>
              <input
                required
                pattern="^[A-Za-z]+$"
                name="recipientName"
                type="text"
                value={this.state.recipient_name}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Recipient Phone Number </label>
              <input
                required
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
  parcel: state.parcels.singleParcel,
  errors: state.parcels.errors,
});

const mapDispatchToProps = {
  createParcelOrder,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateOrder);