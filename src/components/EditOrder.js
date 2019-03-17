import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { editParcelOrder, getSingleParcel } from "../actions/parcelsActions";

class EditOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickupLocation: "",
      newDestination: "",
      recipientName: "",
      recipientPhone: "",
    };
  }

  componentDidMount() {
    this.props.getSingleParcel(this.props.match.params.id);
    // .then((res) => {
    //   //console.log("=====", this.props);
    //   this.setState({
    //     pickupLocation: res.pickup_location,
    //     newDestination: res.destination,
    //     recipientName: res.recipient_name,
    //     recipientPhone: res.recipient_phone,
    //   });
    // }).catch((err) => {
    //   toast.error("Sorry a server error occured!");
    // });
  }

  shouldComponentUpdate(nextProps) {
    console.log("nexttt>>>", nextProps.errors);
    if (this.props !== nextProps) {
      console.log("nexttt>>>", nextProps.errors);
    //   if (nextProps.errors.length) {
    //     const errorString = nextProps.errors.join("\n");
    //     toast.warn(errorString);
    //   } else {
    //     toast.success("Parcel Order Updated Successfully!");
    //     this.props.history.push("/user-profile");
    //   }
    }
    return true;
  }

  handleEditOrder = (e) => {
    const { id } = this.props.match.params;
    e.preventDefault();
    const {
      pickupLocation,
      newDestination,
      recipientName,
      recipientPhone,
    } = this.state;
    this.props
      .editParcelOrder(
        id,
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
    // console.log('dfsdfsd', typeof e.target.value)
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
                // required
                name="pickupLocation"
                type="text"
                minLength="10"
                value={this.state.pickupLocation}
                onChange={this.handleInputChange}
              />
              <br />
              <label>New Destination </label>
              <input
                // required
                name="newDestination"
                type="text"
                minLength="10"
                value={this.state.newDestination}
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
  parcel: state.parcels.singleParcel,
  errors: state.parcels.errors,
});

const mapDispatchToProps = id => ({
  editParcelOrder,
  getSingleParcel,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps(),
)(EditOrder);
