import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import BookingComponent from './components/BookingComponent';
import UpdateBooking from './components/UpdateBooking';
import ViewBookings from './components/ViewBookings';
import AllBookings from './components/AllBookings';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
          <span className="navbar-brand">Bouquet</span>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/book">
                Book Bouquet
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/viewBookings">
                View Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/allBookings">
                View All Bookings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/updateBookings">
                Update Booking
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/book" element={<BookingComponent />} />
          <Route path="/allBookings" element={<AllBookings />} />
          <Route path="/viewBookings" element={<ViewBookings />} />
          <Route path="/updateBookings/:id" element={<UpdateBooking />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
