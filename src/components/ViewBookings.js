
import React, { useEffect, useState } from "react";
import axios from "axios";
import { validation } from "./../validators/validation";
import { useNavigate, useParams } from "react-router-dom";
let url = "http://localhost:4000/bookings/";

function ViewBookings() {
  let params = useParams();
  let navigate = useNavigate();
 
  const [state, setState] = useState({
    bookingId: "",
    bookingData: null,
    infoMessage: "",
  });

  // state variable to indicate whether user has given values to all the mandatory fields of the form .
  const [mandatory, setMandatory] = useState(false);
  // state variable to capture the success Message once the booking is completed successfully .
  const [successMessage, setSuccessMessage] = useState(" ");
  // state variable used to disable the button when any of the given form values is invalid
  const [valid, setvalid] = useState(false);
  // state variable to capture the Error Message when there is any error with booking .
  const [errorMessage, setErrorMessage] = useState(" ");
  // A collection of few messages that the component displays .
  // Wherever applicable , pls use the following json to display the messages instead of hardcoding the messages ,
  const [messages] = useState({
    ERROR: " Something went wrong ",
    INFO: "Booking deleted",
  });

 
  const handleSubmit = (e) => {
    // 1. This method will be invoked when user clicks on ' Book Bouquet ' button .
    // 2. You should prevent page reload on submit
    // 3. check whether all the form fields are entered . If any of the form fields is not entered set the mandatory state variable to true .
    e.preventDefault();
  
      axios
        .get(url+state.bookingId)
        .then((response) => {
          setState({
            ...state,
            bookingData: response.data,
            infoMessage: ""
          })
        })
        .catch((errors) => {
           setState({
             ...state,
             bookingData: "",
             infoMessage: state.bookingId + "not found",
           });
        });
    
  };
  const handleChange = (event) => {
   
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setState({ ...state, [name]: value });
   
  };
  //OnDelete -delete
  //IsUpdate - navigate to /updateBooking/ + <booking Id>
  const handleAction = (action) => {
    if (action === "onDelete") {
      axios
        .delete(url + state.bookingId)
        .then((response) => {
          setState({
            ...state,
            infoMessage: messages.INFO
          });
        })
        .catch((errors) => {
          setState({
            ...state,
            infoMessage: messages.ERROR
          });
        });
    } else {
      navigate("updateBooking/"+ state.bookingId);
     }
    
  };

  return (
    <div className="row">
      <div>
        <br />
        <div className="card">
          <div className="card-header bg-custom">
            <h4>View Booking</h4>
          </div>
          <div className="card-body">
            <form className="form" noValidate onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Booking Id</label>
                <input
                  type="text"
                  name="bookingId"
                  ClassName="form-control"
                  placeholder="Enter a booking Id"
                  value={state.bookingId}
                  onChange={handleChange}
                />
              </div>
              <br />
              <button
                type="submit"
                name="active"
                className="btn btn-primary mt-2"
              >
                Get booking
              </button>
              {state.bookingData ? (
                <table className="table bordered">
                  <thead className="thead">
                    <tr>
                      <th>Booking Id</th>
                      <th>Bouquet Name</th>
                      <th>Email Id</th>
                      <th>No of bouquet</th>
                      <th>Booking Date</th>
                      <th>Action Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{state.bookingId}</td>
                      <td>{state.bookingData.bouquetName}</td>
                      <td>{state.bookingData.emailId}</td>
                      <td>{state.bookingData.flowerCount}</td>
                      <td>{state.bookingData.bookedOn}</td>
                      <td>
                        <button
                          onClick={() => {
                            handleAction("onDelete");
                          }}
                          className="btn btn-primary mt-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            handleAction("isUpadte");
                          }}
                          className="btn btn-primary mt-2"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewBookings