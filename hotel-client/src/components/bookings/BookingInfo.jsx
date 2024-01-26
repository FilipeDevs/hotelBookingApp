import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Spinner } from "react-bootstrap";

function BookingInfo({
  booking,
  payment,
  isFormValid,
  onConfirm,
  showModal,
  toggleModal,
}) {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <Modal show={showModal} onHide={toggleModal}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Name:</strong> {booking.guestFullName}
        </p>
        <p>
          <strong>Email:</strong> {booking.guestEmail}
        </p>
        <p>
          <strong>Check-in Date:</strong>{" "}
          {moment(booking.checkInDate).format("MMM Do YYYY")}
        </p>
        <p>
          <strong>Check-out Date:</strong>{" "}
          {moment(booking.checkOutDate).format("MMM Do YYYY")}
        </p>
        <p>
          <strong>Number of Days Booked:</strong> {numberOfDays}
        </p>
        <div>
          <h5 className="hotel-color mb-3">Number of Guests</h5>
          <p>
            <strong>Adults:</strong> {booking.numberOfAdults}
          </p>
          <p>
            <strong>Children:</strong> {booking.numberOfChildren}
          </p>
        </div>
        {payment > 0 ? (
          <>
            <p>
              <strong>Total cost:</strong> {payment}€
            </p>
          </>
        ) : (
          <p className="text-danger">
            Check-out date must be after check-in date.
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        {isFormValid && !isBookingConfirmed ? (
          <Button
            variant="success"
            onClick={handleConfirmBooking}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <Spinner animation="border" size="sm" role="status" as="span" />
                Confirming booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        ) : isBookingConfirmed ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : null}
      </Modal.Footer>
    </Modal>
  );
}

export default BookingInfo;
