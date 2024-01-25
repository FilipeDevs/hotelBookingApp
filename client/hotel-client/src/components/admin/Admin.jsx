import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
function Admin() {
  return (
    <Container className="mt-5">
      <h2>Admin Panel</h2>
      <hr />
      <Col>
        <Link to="/existing-rooms" className="d-block mb-2">
          Manage Rooms
        </Link>

        <Link to="/existing-bookings" className="d-block mb-2">
          Manage Bookings
        </Link>
      </Col>
    </Container>
  );
}

export default Admin;
