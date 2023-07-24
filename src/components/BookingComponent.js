import React, { useState } from  "react"; 
import axios from "axios"; 
import { validation } from './../validators/validation';
let url = "http://localhost:3000/bookings/" ; 
const BookingComponent = (props) => {
    // State to hold the form details that needs to be added .When user enters the values the state gets updated 
    const [state, setState] = useState({
        bouquetName: "",
        bookedOn: "",
        emailId: "",
        flowerCount: ""
    });
    // state to hold the individual validation errors of the form fields 
    const [formErrors, setFormErrors] = useState({
        emailIdError: " ",
        flowerCountError: "",
        bouquetNameError: "",
        bookedOnError: ""
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
        EMAILID_ERROR: " Please enter valid email ",
        FLOWER_COUNT_ERROR: " Bouquet count ( s ) should be 1 or more ",
        BOUQUET_NAME_ERROR: " Please select bouquet type ",
        BOOKED_ON_ERROR: " Booking date should be after today's date ",
        ERROR: " Something went wrong ",
        MANDATORY: " Enter all the form fields "
    });
    const handleSubmit = (e) => {
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
    const handleChange = (event) => {
        //1. This method will be invoked whenever the user changes the value of any form field . This method should also validate the form fields 2. ' event ' input parameter will contain both name and value of the form field . 
        //3. Set state using the name and value recieved from event parameter 
        //4. call the validateField method for validating form fields . 
        const { name, value } = event.target ;
        console.log(name) ;
        console.log(value) ;
        setState({ ...state, [name]: value }); 
        validateField(name, value);
    }
    const validateField = (name, value) =>{
        let errors = formErrors;
        switch (name){
            case "bouquetName":
                if (validation.validateBouquet (value) ) {
                    errors.bouquetNameError = "";
                } else {
                    errors.bouquetNameError = messages.BOUQUET_NAME_ERROR;
                }
                break;
            case "emailId":
                if (validation.validateEmail(value)) {
                    errors.emailIdError = "";
                } else {
                    errors.emailIdError = messages.EMAILID_ERROR;
                }
                break;
            case "flowerCount":
            
                if (validation.validFlowerCount(value)) {
                    errors.flowerCountError = "";
                } else {
                    errors.flowerCountError = messages.FLOWER_COUNT_ERROR;
                }
                break;
            case "bookedOn":         
                if (validation.validDate(value)) {
                    errors.bookedOnError = "";
                } else {
                    errors.bookedOnError = messages.EMAILID_ERROR;
                }
                break;
            default:
                break;
        }
        setFormErrors(errors);
        if (Object.values(errors).every((value) => value === "")) {
            setvalid(true);
        } else {
            setvalid(false);
        }
    }
    return (
        <div>BookingComponent</div>
    );
        };
        export default BookingComponent;