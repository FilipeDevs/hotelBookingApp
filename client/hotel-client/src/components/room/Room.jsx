import { useEffect, useState } from "react";
import { getAllRooms } from "../utils/API";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator";

const ROOMS_PER_PAGE = 6;

// Render the rooms based on the current page
const renderRooms = (rooms, currentPage) => {
  const startIndex = (currentPage - 1) * ROOMS_PER_PAGE;
  const endIndex = startIndex + ROOMS_PER_PAGE;
  return rooms
    .slice(startIndex, endIndex)
    .map((room) => <RoomCard key={room.id} room={room} />);
};

function Room() {
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      try {
        const data = await getAllRooms();
        setData(data);
        setFilteredData(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
      setIsLoading(false);
    };
    fetchRooms();
  }, []);

  if (isLoading) {
    return <div>Loading rooms.....</div>;
  }
  if (errorMessage) {
    return <div className="text-danger">Error : {errorMessage}</div>;
  }

  const totalPages = Math.ceil(filteredData.length / ROOMS_PER_PAGE);

  const renderPaginator = () => (
    <RoomPaginator
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  );

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter data={data} setFilteredData={setFilteredData} />
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          {renderPaginator()}
        </Col>
      </Row>

      <Row>{renderRooms(filteredData, currentPage)}</Row>

      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          {renderPaginator()}
        </Col>
      </Row>
    </Container>
  );
}

export default Room;
