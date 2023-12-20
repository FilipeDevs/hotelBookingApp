import { useLocation } from "react-router-dom";
import Header from "../common/Header";

function BookingSuccess() {
  const location = useLocation();
  const message = location.state?.message;
  const error = location.state?.error;
  return (
    <div className="container">
      <Header title="Booking Success" />
      <div className="mt-5">
        {message ? (
          <div className="alert alert-success">
            <h3>Booking Success!</h3>
            <p>
              Room booked successfully ! Your booking confirmation code is :{" "}
              <strong>{message}</strong>
            </p>
          </div>
        ) : (
          <div className="alert alert-danger">
            <h3>Error Booking Room!</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingSuccess;
