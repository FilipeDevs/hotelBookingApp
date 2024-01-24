import axiosClient from "./axios-client";

export async function addRoom(photo, roomType, roomPrice, roomDescription) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);
  formData.append("description", roomDescription);

  const response = await axiosClient.post("/rooms/add/new-room", formData);

  if (response.status === 201) {
    return true;
  } else {
    return false;
  }
}

export async function getRoomTypes() {
  try {
    const response = await axiosClient.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching room types");
  }
}

export async function getAllRooms() {
  try {
    const response = await axiosClient.get("/rooms/all");
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching rooms");
  }
}

export async function deleteRoom(roomId) {
  try {
    const response = await axiosClient.delete(`/rooms/delete/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error while deleting room");
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("description", roomData.description);

  // Check if 'photo' is a File instance before appending
  // When no photo is selected dont append anything
  if (roomData.photo instanceof File) {
    formData.append("photo", roomData.photo);
  }

  const response = await axiosClient.put(`/rooms/update/${roomId}`, formData);
  return response;
}

export async function getRoomById(roomId) {
  try {
    const response = await axiosClient.get(`/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching room");
  }
}

export async function bookRoom(roomId, booking) {
  try {
    const response = await axiosClient.post(
      `/bookings/book/${roomId}`,
      booking
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error while booking room");
    }
  }
}

export async function getAllBookings() {
  try {
    const response = await axiosClient.get("/bookings/all");
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching bookings");
  }
}

export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const response = await axiosClient.get(
      `/bookings/confirmation/${confirmationCode}`
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("Error while fetching booking");
    }
  }
}

export async function cancelBooking(bookingId) {
  try {
    const response = await axiosClient.delete(`/bookings/cancel/${bookingId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error while cancelling booking");
  }
}

export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
  const result = await axiosClient.get(
    `rooms/available?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result;
}
