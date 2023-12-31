import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "/node_modules/bootstrap/dist/js/bootstrap.min.js";
import AddRoom from "./components/room/AddRoom";
import ExistingRooms from "./components/room/ExistingRooms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import EditRoom from "./components/room/EditRoom";
import Room from "./components/room/Room";
import Admin from "./components/admin/Admin";
import Checkout from "./components/bookings/Checkout";
import BookingSuccess from "./components/bookings/BookingSuccess";

function App() {
  return (
    <main>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-room/:roomId" element={<EditRoom />} />
          <Route path="/existing-rooms" element={<ExistingRooms />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/browse-all-rooms" element={<Room />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/book-room/:roomId" element={<Checkout />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
        </Routes>
      </Router>
      <Footer />
    </main>
  );
}

export default App;
