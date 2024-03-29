import { useEffect, useState } from "react";
import { deleteRoom, getAllRooms } from "../utils/API";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";
import { FaEye, FaPlus, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function ExistingRooms() {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const response = await getAllRooms();
      setRooms(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
    } else {
      const filteredRooms = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRooms(filteredRooms);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    // If there are filtered rooms, return the number of pages based on the filtered rooms
    // else return the number of pages based on all rooms
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const handleDelete = async (roomId) => {
    try {
      const response = await deleteRoom(roomId);
      if (response === "") {
        setSuccessMessage(`Room No ${roomId} deleted successfully`);
        fetchRooms();
      } else {
        console.error(`Error deleting room no ${roomId} : ${response.message}`);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    // Clear success and error messages after 5 seconds
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 5000);
  };

  // Calculate index of last and first room on the current page
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <Container className="col-md-8 col-lg-6">
      {successMessage && (
        <p className="alert alert-success mt-5">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="alert alert-danger mt-5">{errorMessage}</p>
      )}

      {isLoading ? (
        <p className="container text-center mt-5">Loading...</p>
      ) : (
        <section>
          <Row className="d-flex justify-content-between mb-3 mt-5">
            <h2>Existing Rooms</h2>
          </Row>

          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <RoomFilter
                data={rooms}
                setFilteredData={setFilteredRooms}
              ></RoomFilter>
            </Col>
            <Col md={6} className="d-flex justify-content-end">
              <Link to="/add-room">
                <Button variant="link">
                  <FaPlus /> Add Room
                </Button>
              </Link>
            </Col>
          </Row>

          <Table bordered hover>
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentRooms.map((room) => (
                <tr key={room.id} className="text-center">
                  <td>{room.id}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice} €</td>
                  <td className="gap-2">
                    <Link to={`/edit-room/${room.id}`}>
                      <Button variant="info" size="sm">
                        <FaEye />
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(room.id)}
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <RoomPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(filteredRooms, roomsPerPage, rooms)}
            onPageChange={handlePaginationClick}
          />
        </section>
      )}
    </Container>
  );
}

export default ExistingRooms;
