import React from "react";
import Spinner from "react-md-spinner";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { updateParcelOrder, getSingleParcel } from "../../actions/parcelsActions";

class EditOrder extends React.Component {
  state = {
    pickupLocation: "",
    destination: "",
    recipientName: "",
    recipientPhone: "",
  };

  componentDidMount() {
    this.props.getSingleParcel(this.props.match.params.id);
  }

  shouldComponentUpdate = (nextProps) => {
    if (!this.state.pickupLocation) {
      this.setState({
        pickupLocation: nextProps.parcel.pickup_location,
        destination: nextProps.parcel.destination,
        recipientName: nextProps.parcel.recipient_name,
        recipientPhone: nextProps.parcel.recipient_phone,
      });
    } else if (this.props.parcel !== nextProps.parcel) {
      if (nextProps.parcel) {
        toast.success("Parcel Order Updated Successfully!");
        this.props.history.push("/user-profile");
      } else {
        const errorString = nextProps.error;
        toast.warn(errorString);
      }
    }
    return true;
  };

  handleEditOrder = (e) => {
    const { id } = this.props.match.params;
    e.preventDefault();
    this.props.updateParcelOrder(id, this.state);
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { processing } = this.props;
    return (
      <div className="main-edit-order-page">
        <div className="edit-order-wrapper">
          <div className="edit-order-page">
            <Link to="/user-profile">
              <i className="fas fa-arrow-left" />
            </Link>
            <h1>Edit Order</h1>

            <form onSubmit={this.handleEditOrder} id="edit-order-form">
              <label>Pick Up Location </label>
              <input
                required
                name="pickupLocation"
                type="text"
                minLength="10"
                value={this.state.pickupLocation}
                onChange={this.handleInputChange}
              />
              <br />
              <label>New Destination </label>
              <input
                required
                name="destination"
                type="text"
                minLength="10"
                value={this.state.destination}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Recipient Name </label>
              <input
                required
                name="recipientName"
                type="text"
                pattern="^[A-Za-z]+$"
                value={this.state.recipientName}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Recipient Phone Number </label>
              <input
                required
                name="recipientPhone"
                type="text"
                minLength="10"
                value={this.state.recipientPhone}
                onChange={this.handleInputChange}
              />
              <br />
              <button
                className="button"
                type="submit"
                disabled={processing}
              >
                {processing ? (
                  <Spinner
                    size={18}
                    singleColor="white"
                  />
                ) : "Proceed"}
              </button>
              <h4 id="error-msg" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, parcels }, ownProps) => {
  const props = parseInt(ownProps.match.params.id, 10);
  return {
    processing: user.isProcessing,
    user: user.userData,
    parcel: parcels.data.find(parcel => parcel.id === props),
    error: parcels.error,
  };
};

const mapDispatchToProps = id => ({
  updateParcelOrder,
  getSingleParcel,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(EditOrder);
