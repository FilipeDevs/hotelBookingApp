import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData);

  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching room types");
  }
}

export async function getAllRooms() {
  try {
    const response = await api.get("/rooms/all");
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching rooms");
  }
}

export async function deleteRoom(roomId) {
  try {
    const response = await api.delete(`/rooms/delete/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error while deleting room");
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);

  // Check if 'photo' is a File instance before appending
  // When no photo is selected dont append anything
  if (roomData.photo instanceof File) {
    formData.append("photo", roomData.photo);
  }

  const response = await api.put(`/rooms/update/${roomId}`, formData);
  return response;
}

export async function getRoomById(roomId) {
  try {
    const response = await api.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching room");
  }
}
