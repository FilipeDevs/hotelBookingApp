package com.filipeDevs.hotelapi.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.filipeDevs.hotelapi.exception.PhotoRetrievalException;
import com.filipeDevs.hotelapi.exception.ResourceNotFoundException;
import com.filipeDevs.hotelapi.model.BookedRoom;
import com.filipeDevs.hotelapi.model.Room;
import com.filipeDevs.hotelapi.response.BookingResponse;
import com.filipeDevs.hotelapi.response.RoomResponse;
import com.filipeDevs.hotelapi.service.BookingServiceInterface;
import com.filipeDevs.hotelapi.service.RoomServiceInterface;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    private final RoomServiceInterface roomService;

    private final BookingServiceInterface bookingService;

    @PostMapping("/add/new-room")
    public ResponseEntity<RoomResponse> addNewRoom(
            @RequestParam("photo") MultipartFile photo, @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") BigDecimal roomPrice, @RequestParam("description") String description)
            throws SQLException, IOException {
        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice, description);
        RoomResponse roomResponse = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(),
                savedRoom.getRoomPrice(), savedRoom.getDescription());

        return ResponseEntity.ok(roomResponse);

    }

    @GetMapping("/room/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/all")
    public ResponseEntity<List<RoomResponse>> getAllRooms() throws SQLException {
        List<Room> rooms = roomService.getAllRooms();
        List<RoomResponse> roomResponses = new ArrayList<>();

        // Create a room response for each room and add it to the list
        for (Room room : rooms) {
            RoomResponse roomResponse = getRoomResponse(room);
            roomResponses.add(roomResponse);
        }

        return ResponseEntity.ok(roomResponses);
    }

    @DeleteMapping("/delete/{roomId}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long roomId) throws SQLException {
        roomService.deleteRoom(roomId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update/{roomId}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long roomId,
            @RequestParam(required = false) String roomType,
            @RequestParam(required = false) BigDecimal roomPrice,
            @RequestParam(required = false) MultipartFile photo,
            @RequestParam(required = false) String description) throws SQLException, IOException {
        // Get photo bytes from request if it is not null
        byte[] photoBytes = photo != null && !photo.isEmpty() ? photo.getBytes()
                : roomService.getRoomPhotoByRoomId(roomId);
        Room room = roomService.updateRoom(roomId, roomType, roomPrice, description, photoBytes);
        RoomResponse roomResponse = getRoomResponse(room);
        return ResponseEntity.ok(roomResponse);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long roomId) {
        Optional<Room> room = roomService.getRoomById(roomId);
        if (room.isPresent()) {
            RoomResponse roomResponse = getRoomResponse(room.get());
            return ResponseEntity.ok(roomResponse);
        } else {
            throw new ResourceNotFoundException("Room not found");
        }
    }

    // Helper method to get room response with bookings info of a room
    private RoomResponse getRoomResponse(Room room) {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());

        // Convert each booking to booking response
        List<BookingResponse> bookingsInfo = bookings.stream()
                .map(booking -> new BookingResponse(booking.getBookingId(), booking.getCheckInDate(),
                        booking.getCheckOutDate(), booking.getBookingConfirmationCode()))
                .toList();
        // Get photo of room
        byte[] photoBytes = null;
        Blob photoBlob = room.getPhoto();
        if (photoBlob != null) {
            try {
                photoBytes = photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new PhotoRetrievalException("Error retrieving photo from database");
            }
        }

        // Note : RoomResponse constructor will convert photo bytes to Base64 String
        return new RoomResponse(room.getId(), room.getRoomType(), room.getRoomPrice(), room.getDescription(),
                room.isBooked(),
                photoBytes,
                bookingsInfo);
    }

    // Helper method to get all bookings of a room
    private List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingService.getAllBookingsByRoomId(roomId);
    }

}