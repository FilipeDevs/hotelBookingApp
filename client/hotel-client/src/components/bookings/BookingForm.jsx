import { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { bookRoom, getRoomById } from "../utils/API";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BookingInfo from "./BookingInfo";

function BookingForm({ roomPrice }) {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [booking, setBooking] = useState({
    guestFullName: "",
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: 1,
    numberOfChildren: 0,
  });

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const calculateTotalPrice = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const paymentPerDay = roomPrice ? roomPrice : 0;
    return diffInDays * paymentPerDay;
  };

  // Check if the booking has enough guests and at least one adult
  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.numberOfAdults);
    const childrenCount = parseInt(booking.numberOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage("Check-out date must be after check-in date");
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isGuestCountValid() ||
      !isCheckOutDateValid()
    ) {
      e.stopPropagation();
    } else {
      setShowModal(true);
    }
    setValidated(true);
  };

  const handleFormSubmit = async () => {
    try {
      const confirmationCode = await bookRoom(roomId, booking);
      setIsSubmitted(true);
      navigate("/booking-success", { state: { message: confirmationCode } });
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
      navigate("/booking-success", { state: { error: errorMessage } });
    }
  };

  return (
    <>
      <div className="card card-body ">
        <h4 className="card-title">Book Room</h4>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          {/* Guest Info */}
          <Form.Group>
            <Form.Label htmlFor="guestFullName">Full Name</Form.Label>
            <FormControl
              required
              type="text"
              id="guestFullName"
              name="guestFullName"
              value={booking.guestFullName}
              placeholder="Enter your fullname"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your full name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="guestEmail">Email</Form.Label>
            <FormControl
              required
              type="email"
              id="guestEmail"
              name="guestEmail"
              value={booking.guestEmail}
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          {/* Lodging Period */}
          <Form.Group>
            <Form.Label htmlFor="checkInDate">Check-in date</Form.Label>
            <FormControl
              required
              type="date"
              id="checkInDate"
              name="checkInDate"
              value={booking.checkInDate}
              placeholder="check-in-date"
              min={moment().format("MMM Do, YYYY")}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please select a check in date.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="checkOutDate">Check-out date</Form.Label>
            <FormControl
              required
              type="date"
              id="checkOutDate"
              name="checkOutDate"
              value={booking.checkOutDate}
              placeholder="check-out-date"
              min={moment().format("MMM Do, YYYY")}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please select a check out date.
            </Form.Control.Feedback>
            {errorMessage && (
              <p className="error-message text-danger">{errorMessage}</p>
            )}
          </Form.Group>

          {/* Number of Guests */}
          <Form.Group>
            <Form.Label htmlFor="numberOfAdults">Adults</Form.Label>
            <FormControl
              required
              type="number"
              id="numberOfAdults"
              name="numberOfAdults"
              value={booking.numberOfAdults}
              min={1}
              placeholder="0"
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Please select at least 1 adult.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="numberOfChildren">Children</Form.Label>
            <FormControl
              required
              type="number"
              id="numberOfChildren"
              name="numberOfChildren"
              value={booking.numberOfChildren}
              placeholder="0"
              min={0}
              onChange={handleInputChange}
            />
            <Form.Control.Feedback type="invalid">
              Select 0 if no children
            </Form.Control.Feedback>
          </Form.Group>

          <div className="form-group mt-2 mb-2">
            <Button type="submit" className="btn btn-hotel">
              Continue
            </Button>
          </div>
        </Form>
      </div>
      <BookingInfo
        booking={booking}
        payment={calculateTotalPrice()}
        onConfirm={handleFormSubmit}
        isFormValid={validated}
        showModal={showModal}
        toggleModal={() => setShowModal(!showModal)}
      />
    </>
  );
}

export default BookingForm;
