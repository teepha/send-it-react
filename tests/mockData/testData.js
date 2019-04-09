export const userData = {
  authResponse: {
    msg: "Registration successful",
    userId: 2,
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mbyI6eyJpZCI6MiwiZmlyc3RfbmFt" 
      + "ZSI6IlNoYXJvbiIsImxhc3RfbmFtZSI6IkZhdm9yIiwiZW1haWwiOiJzaGFyb25AZW1haWwuY29t"
      + "IiwicGhvbmVfbnVtYmVyIjoiMDgwMzQ1MjEyMzIiLCJwYXNzd29yZCI6InNoYXJvbiIsInJvbGUiO"
      + "iJtZW1iZXIifSwiaWF0IjoxNTU0MTI0NDYxfQ.2jXQ0Dpt6BHIyioFS5p6ZD9k-g14xK_FRprP_xuBapQ"
  },
  newUser: {
    id: 2,
    first_name: "Sharon",
    last_name: "Favor",
    email: "sharon@email.com",
    phone_number: "08034521232",
    password: "sharon",
    role: "member"
  },
  userRequestData: {
    first_name: "lateefat",
    last_name: "Amuda",
    email: "lateepha06@email.com",
    phone_number: "08034521232",
    password: "lateefat"
  },
  invalidRequestData: {
    email: "lateepha06@email.com",
    password: "latee"
  },
  userErrorResponse: {
    msg: "Invalid User credentials"
  }
};

export const parcelData = {
  createParcelRequestData: {
    userId: 1,
    pickupLocation: "Amity, Mende",
    destination: "Arowojobe",
    recipientName: "Tiku",
    recipientPhone: "08123456789"
  },
  invalidCreateParcelData: {
    userId: 1,
    pickupLocation: "Amity, Mende",
    destination: "Arowojobe",
    recipientName: "Tiku",
    recipientPhone: ""
  },
  createParcelErrorResponse: {
    errors: [
      {
        location: "body",
        param: "recipientPhone",
        value: "",
        msg: "field must not be Empty!"
      }
    ]
  },
  updateParcelRequestData: {
    pickupLocation: "15 Idowu Taylor, VI",
    destination: "Arowojobe",
    recipientName: "Tiku",
    recipientPhone: "08123456789"
  },
  updateParcelResponse: {
    id: 8,
    user_id: 1,
    date: "2019-04-04T23:00:00.000Z",
    pickup_location: "15 Idowu Taylor, VI",
    destination: "11 Sunmola, Mende",
    recipient_name: "Tiku",
    recipient_phone: "08123456789",
    status: "ready_for_pickup",
    present_location: ""
  },
  updateLocationErrorResponse: {
    errors: [
      {
        location: "body",
        param: "presentLocation",
        value: "",
        msg: "Field must not be empty!"
      }
    ]
  },
  updateStatusResponse: {
    id: 8,
    user_id: 1,
    date: "2019-04-04T23:00:00.000Z",
    pickup_location: "15 Idowu Taylor, VI",
    destination: "Arowojobe",
    recipient_name: "Tiku",
    recipient_phone: "08123456789",
    status: "in-transit",
    present_location: "Victoria Island"
  },
  updateStatusErrorResponse: {
    msg: "Sorry, can't change status for this Order. Parcel already Delivered"
  },
  cancelledParcelResponse: {
    id: 10,
    user_id: 1,
    date: "2019-04-04T23:00:00.000Z",
    pickup_location: "15 Idowu Taylor, VI",
    destination: "Arowojobe",
    recipient_name: "Tiku",
    recipient_phone: "08123456789",
    status: "cancelled",
    present_location: "Victoria Island"
  },
  cancelParcelErrorResponse: {
    msg: "Sorry, can not cancel Order. Parcel already Cancelled"
  },
  parcelsErrorResponse: {
    msg: "Sorry an error occurred!"
  },
  parcels: [
    {
      id: 8,
      user_id: 1,
      date: "2019-04-04T23:00:00.000Z",
      pickup_location: "Amity, Mende",
      destination: "Arowojobe",
      recipient_name: "Tiku",
      recipient_phone: "08123456789",
      status: "ready_for_pickup",
      present_location: ""
    },
    {
      id: 4,
      user_id: 1,
      date: "2019-04-01T23:00:00.000Z",
      pickup_location: "11 Sunmola Street ikeja",
      destination: "235 Abiola way",
      recipient_name: "Lawal",
      recipient_phone: "08022334455",
      status: "ready_for_pickup",
      present_location: ""
    },
    {
      id: 3,
      user_id: 1,
      date: "2019-03-31T23:00:00.000Z",
      pickup_location: "235 Ikorodu road Ilupeju",
      destination: "15 Bode Judge VI",
      recipient_name: "Bola",
      recipient_phone: "0912345678",
      status: "cancelled",
      present_location: ""
    },
    {
      id: 2,
      user_id: 1,
      date: "2019-03-31T23:00:00.000Z",
      pickup_location: "235 Ikorodu road",
      destination: "10 Sibo Sifre Street",
      recipient_name: "Bolatito",
      recipient_phone: "0912345678",
      status: "delivered",
      present_location: "Adeola Street, Ikeja"
    },
    {
      id: 10,
      user_id: 1,
      date: "2019-04-04T23:00:00.000Z",
      pickup_location: "15 Idowu Taylor, VI",
      destination: "Arowojobe",
      recipient_name: "Tiku",
      recipient_phone: "08123456789",
      status: "in-transit",
      present_location: "Victoria Island"
    }
  ]
};
