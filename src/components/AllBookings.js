import axios from 'axios';
import React, { useEffect, useState } from 'react'

function AllBookings() {
    /*     const [bookings, setBookings] = useState([]); */
    let hold = [{
        "id": 1001,
        "bouquetName": "RoselineRed",
        "bookedOn": "",
        "emailId": "",
        "flowerCount": 4}
    ];
        const [bookings, setBookings] = useState(hold);
    const [error, setError] = useState();

    useEffect(() => {
        axios
            .get("http://localhost:3000/bookings/")
            .then((res) => {
                setBookings(res.data);
            })
            .catch((err) => {
                setError("Get data failuure");
            });
    }, []);

    const handleAction = (id) => {
        axios
          .delete("http://localhost:3000/bookings/"+id)
            .then((res) => {
                const afterDelete = bookings.filter(t => t.id != id);
            
          })
          .catch((err) => {
            
          });
    };

    
  return (
      <div>
          {bookings.map((booking) => {
              return (
                <div
                  key={booking.id}
                  className="card"
                  style={{ margin: "20px" }}
                >
                  <h4 className="card-header">Booking id: {booking.id}</h4>
                  <div className="card-body" style={{ padding: "10px" }}>
                    <p>bouquetName: {booking.bouquetName}</p>
                    <p>bookedOn: {booking.bookedOn}</p>
                    <p>emailId: {booking.emailId}</p>
                    <p>flowerCount: {booking.flowerCount}</p>
                          <button className='btn btn-danger mt-2 ms-2'
                          onClick={() => {handleAction(booking.id)}}>Delete</button>
                  </div>
                </div>
              );
          }
              
          )
          
          
          }
    </div>
  )
}

export default AllBookings