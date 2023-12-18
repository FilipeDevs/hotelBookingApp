import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

function RoomCard({ room }) {
  return (
    <Col key={room.id} className="mb-4" xs={12}>
      <Card>
        <Card.Body className="d-flex flex-wrap align-items-center">
          <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
            <Link>
              <Card.Img
                variant="top"
                src={`data:image/png;base64, ${room.photo}`}
                alt="Room Photo"
                style={{ width: "100%", maxWidth: "200px", height: "auto" }}
              />
            </Link>
          </div>
          <div className="flex-grow-1 ml-3 px-5">
            <Card.Title className="hotel-color">{room.roomType}</Card.Title>
            <Card.Title className="room-price">
              {room.roomPrice} € / night
            </Card.Title>
            <Card.Text>
              {room.description.length > 100
                ? room.description.substring(0, 100) + "..."
                : room.description}
            </Card.Text>
          </div>
          <div className="flex-shrink-0 mt-3">
            <Link className="btn btn-hotel btn-sm">Book Now</Link>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RoomCard;
