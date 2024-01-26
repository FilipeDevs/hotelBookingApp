import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getUser, getBookingsByUserId } from "../utils/API";
import { useAuthContext } from "./AuthProvider";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";

function Profile() {
  const auth = useAuthContext();

  const [user, setUser] = useState({
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    roles: [{ id: "", name: "" }],
  });

  const [bookings, setBookings] = useState([
    {
      id: "",
      room: { id: "", roomType: "" },
      checkInDate: "",
      checkOutDate: "",
      bookingConfirmationCode: "",
    },
  ]);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { userId } = useAuthContext();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getBookingsByUserId(userId);
        setBookings(response);
      } catch (error) {
        console.error("Error fetching bookings:", error.message);
        setErrorMessage(error.message);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmed) {
      await deleteUser(userId)
        .then((response) => {
          setMessage(response.data);
          auth.handleLogout();
          navigate("/");
          window.location.reload();
        })
        .catch((error) => {
          setErrorMessage(error.data);
        });
    }
  };

  return (
    <Container className="mt-5">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {message && <Alert variant="danger">{message}</Alert>}
      {user ? (
        <Card className="p-5 mt-5" bg="whitesmoke">
          <Card.Title className="text-center">User Information</Card.Title>
          <Card.Body>
            <Row className="mb-4">
              <Col md={2}>
                <div className="d-flex justify-content-center align-items-center mb-4">
                  <img
                    src="https://themindfulaimanifesto.org/wp-content/uploads/2020/09/male-placeholder-image.jpeg"
                    alt="Profile"
                    className="rounded-circle"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </Col>

              <Col md={10}>
                <Card.Body>
                  <hr />
                  <Row className="mb-3">
                    <Col md={2} className="fw-bold">
                      First Name:
                    </Col>
                    <Col md={10}>
                      <p className="card-text">{user.firstName}</p>
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col md={2} className="fw-bold">
                      Last Name:
                    </Col>
                    <Col md={10}>
                      <p className="card-text">{user.lastName}</p>
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col md={2} className="fw-bold">
                      Email:
                    </Col>
                    <Col md={10}>
                      <p className="card-text">{user.email}</p>
                    </Col>
                  </Row>
                  <hr />

                  <Row className="mb-3">
                    <Col md={2} className="fw-bold">
                      Roles:
                    </Col>
                    <Col md={10}>
                      <ul className="list-unstyled">
                        {user.roles.map((role) => (
                          <li key={role.id} className="card-text">
                            {role.name}
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </Card.Body>
              </Col>
            </Row>

            <Card.Title className="text-center">Booking History</Card.Title>

            {bookings.length > 0 ? (
              <Table bordered hover responsive className="shadow">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Room ID</th>
                    <th>Room Type</th>
                    <th>Check In Date</th>
                    <th>Check Out Date</th>
                    <th>Confirmation Code</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking, index) => (
                    <tr key={index}>
                      <td>{booking.id}</td>
                      <td>{booking.room.id}</td>
                      <td>{booking.room.roomType}</td>
                      <td>
                        {moment(booking.checkInDate).format("MMM Do, YYYY")}
                      </td>
                      <td>
                        {moment(booking.checkOutDate).format("MMM Do, YYYY")}
                      </td>
                      <td>{booking.bookingConfirmationCode}</td>
                      <td
                        className={
                          moment().isAfter(booking.checkOutDate)
                            ? "text-danger"
                            : "text-success"
                        }
                      >
                        {moment().isAfter(booking.checkOutDate)
                          ? "Completed"
                          : "On-going"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>You have not made any bookings yet.</p>
            )}

            <div className="d-flex justify-content-center">
              <div className="mx-2">
                <Button
                  variant="danger"
                  size="sm"
                  onClick={handleDeleteAccount}
                >
                  Close account
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      ) : (
        <p>Loading user data...</p>
      )}
    </Container>
  );
}

export default Profile;
