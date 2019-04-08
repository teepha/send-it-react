import React from "react";
import Spinner from "react-md-spinner";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { createParcelOrder } from "../../actions/parcelsActions";

export class CreateOrder extends React.Component {
  state = {
    pickupLocation: "",
    destination: "",
    recipientName: "",
    recipientPhone: ""
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.parcels.length !== nextProps.parcels.length) {
      if (this.props.error !== nextProps.error) {
        const errorString = nextProps.error;
        toast.warn(errorString);
      } else {
        toast.success("Parcel Order Created Successfully!");
        this.props.history.push("/user-profile");
      }
    }
    return true;
  }

  handleCreateOrder = e => {
    e.preventDefault();
    const { user } = this.props;
    const userId = user.id;
    this.props.createParcelOrder(userId, this.state);
  };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { processing } = this.props;
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
                minLength="10"
                name="recipientPhone"
                type="text"
                value={this.state.recipient_phone}
                onChange={this.handleInputChange}
              />
              <br />
              <button className="button" type="submit" disabled={processing}>
                {processing ? (
                  <Spinner size={18} singleColor="#fff" />
                ) : (
                  "Create Order"
                )}
              </button>
              <h4 id="error-msg" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  processing: state.user.isLoading,
  user: state.user.userData,
  parcels: state.parcels.data,
  error: state.parcels.error
});

const mapDispatchToProps = {
  createParcelOrder
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreateOrder)
);
