import { useState } from "react";

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

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  // Extract all unique room types from the data
  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Filter Rooms By Type
      </span>
      <select
        className="form-select"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value={""}>Select a room to filter...</option>
      </select>
    </div>
  );
}

export default RoomFilter;
