import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

function RoomFilter({ data, setFilteredData }) {
  const [filter, setFilter] = useState("");

  // Filter rooms by selected room type and update the filtered data
  const handleSelectChange = (e) => {
    const selectedRoomType = e.target.value;
    setFilter(selectedRoomType);
    const filterdRooms = data.filter((room) =>
      room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase())
    );
    setFilteredData(filterdRooms);
  };

  const handleClearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  // Extract all unique room types from the data
  const roomTypes = [...new Set(data.map((room) => room.roomType))];

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id="room-type-filter">
        Filter Rooms By Type
      </InputGroup.Text>
      <FormControl as="select" value={filter} onChange={handleSelectChange}>
        <option value="" disabled>
          Select a room to filter...
        </option>
        {roomTypes.map((roomType, index) => (
          <option key={index} value={roomType}>
            {roomType}
          </option>
        ))}
      </FormControl>
      <Button variant="primary" type="button" onClick={handleClearFilter}>
        Clear Filter
      </Button>
    </InputGroup>
  );
}

export default RoomFilter;
