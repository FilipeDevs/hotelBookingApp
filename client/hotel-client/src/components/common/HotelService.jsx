import { Row, Col, Card } from "react-bootstrap";
import Header from "./Header";
import {
  FaClock,
  FaCocktail,
  FaParking,
  FaSnowflake,
  FaTshirt,
  FaUtensils,
  FaWifi,
} from "react-icons/fa";

function HotelService() {
  return (
    <>
      <div className="mb-2">
        <Header title={"Our Services"} />

        <Row className="mt-4">
          <h4 className="text-center">
            Elevate Your Stay at <span className="">Filipe Oasis Hotel</span>{" "}
            <span className="gap-2">
              <FaClock className="ml-5 mb-1" /> Available 24/7
            </span>
          </h4>
        </Row>
        <hr />

        <Row xs={1} md={2} lg={3} className="g-4 mt-2">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaWifi className="mb-1" /> High-Speed WiFi
                </Card.Title>
                <Card.Text>
                  Stay effortlessly connected with our high-speed internet
                  access.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaUtensils className="mb-1" /> Complimentary Breakfast
                </Card.Title>
                <Card.Text>
                  Begin your day with a delightful breakfast buffet, on the
                  house.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaTshirt className="mb-1" /> Laundry Service
                </Card.Title>
                <Card.Text>
                  Keep your wardrobe fresh with our efficient laundry service.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaCocktail className="mb-1" /> In-Room Mini-Bar
                </Card.Title>
                <Card.Text>
                  Indulge in a variety of refreshing drinks and snacks from our
                  mini-bar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaParking className="mb-1" /> On-Site Parking
                </Card.Title>
                <Card.Text>
                  Conveniently park your vehicle in our dedicated on-site
                  parking lot.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="hotel-color">
                  <FaSnowflake className="mb-1" /> Air-Conditioned Comfort
                </Card.Title>
                <Card.Text>
                  Enjoy a cool and comfortable stay with our advanced air
                  conditioning system.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <hr />
    </>
  );
}

export default HotelService;
