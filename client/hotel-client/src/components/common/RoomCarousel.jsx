import { useEffect, useState } from "react";
import { getAllRooms } from "../utils/API";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";

function RoomCarousel() {
  const [rooms, setRooms] = useState([
    { id: "", roomType: "", roomPrice: "", photo: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="mt-5">Loading rooms....</div>;
  }
  if (errorMessage) {
    return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>;
  }

  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link to={"/browse-all-rooms"} className="hotel-color text-center mb-1">
        Browse all rooms...
      </Link>

      <Container>
        <Carousel indicators={true}>
          {[...Array(Math.ceil(rooms.length / 3))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 3, index * 3 + 3).map((room) => (
                  <Col key={room.id} className="mb-4" xs={12} md={8} lg={4}>
                    <Card>
                      <Link>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64, ${room.photo}`}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "250px" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-color">
                          {room.roomType}
                        </Card.Title>
                        <Card.Title className="room-price">
                          ${room.roomPrice}/night
                        </Card.Title>
                        <div className="flex-shrink-0">
                          <Link className="btn btn-hotel btn-sm">Book Now</Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
}

export default RoomCarousel;
