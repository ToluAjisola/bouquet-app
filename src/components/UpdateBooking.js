import React, { useEffect, useState } from "react";
import axios from "axios";
import { validation } from "./../validators/validation";
import { useParams } from "react-router-dom";
let url = "http://localhost:3000/bookings/";
function UpdateBooking() {
  let params = useParams();
  const [bookings, setBookings] = useState({});
  // State to hold the form details that needs to be added .When user enters the values the state gets updated
  const [bouquetName, setBouquetName] = useState("");
  const [emailId, setEmailId] = useState(0);
  const [flowerCount, setFlowerCount] = useState("");
  const [bookedOn, setBookedOn] = useState("");
    const [state, setState] = useState({
        bouquetName: "",
        bookedOn: "",
        emailId: "",
        flowerCount: ""
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
        MANDATORY: " Enter all the form fields "
    });
  
  useEffect(() => {
    axios
      .get(url+params.id)
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        
      });
  }, []);
    const update = (e) => {
        // 1. This method will be invoked when user clicks on ' Book Bouquet ' button .
        // 2. You should prevent page reload on submit
        // 3. check whether all the form fields are entered . If any of the form fields is not entered set the mandatory state variable to true . 
        e.preventDefault();
        if (state.bouquetName === "" ||
            state.bookedOn === "" || state.emailed === "" ||
            state.flowerCount) {
            setMandatory(true);
        } else {
            let data = { ...state };
            setMandatory(false);
            axios
                .post(url, data)
                .then((response) => {
                    setSuccessMessage(
                        " Booking is successfully created with bookingId :" + response.data.id
                    ); console.log(response.data.id);
                })
                .catch((errors) => {
                    setErrorMessage(messages.ERROR); console.log(" error occoured ");
                });
        }
    }
    
  
    return (
      <React.Fragment>
        <div className="CreateBooking">
          <div className="row">
            <div>
              <br />
              <div className="card" style={{ width: "500px" }}>
                <div className="card-header bg-Custom">
                  <h4>Book Your Bouquet</h4>
                </div>
                <div className="card-body">
                  <form className="form" noValidate onSubmit={update}>
                    <div className="form-group">
                      <label>Bouquet Name</label>
                      <select
                        name="bouquetName"
                        className="form-control"
                        value={state.bouquetName}
                        onChange={(event) => {
                          setBouquetName(event.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Select a bouquet
                        </option>
                        <option value="RosalineRed">Rosaline Red</option>
                        <option value="TerifficTulip">Teriffic Tulip</option>
                        <option value="ChineseChandelier">
                          Chinese Chandelier{" "}
                        </option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Email Id</label>
                      <input
                        type="email"
                        name="emailId"
                        ClassName="form-control"
                        placeholder="Enter your email"
                        value={state.emailId}
                        onChange={(event) => {
                          setEmailId(event.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label>No of Bouquet</label>
                      <input
                        type="number"
                        name="flowerCount"
                        ClassName="form-control"
                        placeholder="Number of Bouquet"
                        value={state.flowerCount}
                        onChange={(event) => {
                          setFlowerCount(event.target.value);
                        }}
                      />
                    </div>
                    <br />
                    <button
                      type="submit"
                      name="active"
                      className="btn btn-primary"
                    >
                      Update Bouquet
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
        };

export default UpdateBooking;
