import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { editParcelOrder, getSingleParcel } from "../actions/parcelsActions";

class EditOrder extends React.Component {
  constructor(props) {
    super(props);
    console.log("got hereeee");
    this.state = {
      pickupLocation: "",
      newDestination: "",
      recipientName: "",
      recipientPhone: "",
    };
  }

  componentDidMount() {
    this.props.getSingleParcel(this.props.match.params.id)
      .then((res) => {
        console.log("====didmount", res);
        this.setState({
          pickupLocation: res.pickup_location,
          newDestination: res.destination,
          recipientName: res.recipient_name,
          recipientPhone: res.recipient_phone,
        });
      }).catch((err) => {
        toast.error("Sorry a server error occured!");
      });
  }

  handleEditOrder = (e) => {
    e.preventDefault();
    const {
      pickupLocation,
      newDestination,
      recipientName,
      recipientPhone,
    } = this.state;
    this.props.editParcelOrder(
      pickupLocation,
      newDestination,
      recipientName,
      recipientPhone,
    );
    // .then((res) => {
    //   if (!res.id) {
    //     return res;
    //   }
    //   this.props.history.push("/user-profile");
    //   return res;
    // })
    // .catch((err) => {
    //   return err;
    // });
  };

  handleInputChange = (e) => {
    console.log("eeee", e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="main-edit-order-page">
        <div className="edit-order-wrapper">
          <div className="edit-order-page">
            <Link to="./user-profile">
              <i className="fas fa-arrow-left" />
            </Link>
            <h1>Edit Order</h1>

            <form onSubmit={this.handleEditOrder} id="edit-order-form">
              <label>Pick Up Location </label>
              <input
                name="pickupLocation"
                type="text"
                value={this.state.pickupLocation}
                onChange={this.handleInputChange}
              />
              <br />
              <label>New Destination </label>
              <input
                name="newDestination"
                type="text"
                value={this.state.newDestination}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Recipient Name </label>
              <input
                ame="recipientName"
                type="text"
                value={this.state.recipientName}
                onChange={this.handleInputChange}
              />
              <br />
              <label>Recipient Phone Number </label>
              <input
                name="recipientPhone"
                type="text"
                value={this.state.recipientPhone}
                onChange={this.handleInputChange}
              />
              <br />
              <button className="button">Proceed</button>
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

const mapDispatchToProps = id => ({
  editParcelOrder,
  getSingleParcel,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(EditOrder);
