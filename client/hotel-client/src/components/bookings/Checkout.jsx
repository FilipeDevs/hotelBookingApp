import { useEffect, useState } from "react";
import BookingForm from "./BookingForm";
import { getRoomById } from "../utils/API";
import { useParams } from "react-router-dom";
import { Image, Table, Row, Col, Badge, Container } from "react-bootstrap";
import {
  FaUtensils,
  FaWifi,
  FaTv,
  FaWineGlassAlt,
  FaParking,
  FaCar,
  FaTshirt,
} from "react-icons/fa";

function Checkout() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roomInfo, setRoomInfo] = useState({
    photo: "",
    roomType: "",
    roomPrice: "",
  });

  const { roomId } = useParams();

  useEffect(() => {
    setTimeout(() => {
      getRoomById(roomId)
        .then((response) => {
          setRoomInfo(response);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, 1000);
  }, [roomId]);

  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col>
          <img
            src={`data:image/png;base64,${roomInfo.photo}`}
            alt="Room photo"
            style={{ height: "300px", width: "100%" }}
          />
          <Table bordered>
            <tbody>
              <tr>
                <th>Room Type:</th>
                <td>{roomInfo.roomType}</td>
              </tr>
              <tr>
                <th>Price per night:</th>
                <td>{roomInfo.roomPrice}€</td>
              </tr>
              <tr>
                <th>Room Service:</th>
                <td>
                  <ul className="list-unstyled">
                    <li>
                      <FaWifi /> Wifi
                    </li>
                    <li>
                      <FaTv /> Netfilx Premium
                    </li>
                    <li>
                      <FaUtensils /> Breakfast
                    </li>
                    <li>
                      <FaWineGlassAlt /> Mini bar
                    </li>
                    <li>
                      <FaCar /> Car Service
                    </li>
                    <li>
                      <FaParking /> Parking
                    </li>
                    <li>
                      <FaTshirt /> Laundry
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col>
          <BookingForm roomPrice={roomInfo.roomPrice} />
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
