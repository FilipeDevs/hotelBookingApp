package com.filipeDevs.hotelapi.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.filipeDevs.hotelapi.exception.ResourceNotFoundException;
import com.filipeDevs.hotelapi.model.BookedRoom;
import com.filipeDevs.hotelapi.model.Room;
import com.filipeDevs.hotelapi.response.BookingResponse;
import com.filipeDevs.hotelapi.response.RoomResponse;
import com.filipeDevs.hotelapi.service.BookingServiceInterface;
import com.filipeDevs.hotelapi.service.RoomServiceInterface;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    private final BookingServiceInterface bookingService;
    private final RoomServiceInterface roomService;

    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> bookingResponses = new ArrayList<>();
        for (BookedRoom booking : bookings) {
            BookingResponse bookingResponse = getBookingResponse(booking);
            bookingResponses.add(bookingResponse);
        }
        return ResponseEntity.ok(bookingResponses);
    }

    public ResponseEntity<?> saveBooking(@PathVariable Long roomId,
            @RequestBody BookedRoom bookingRequest) {
        try {
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok(
                    "Room booked successfully, Your booking confirmation code is :" + confirmationCode);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room room = roomService.getRoomById(booking.getRoom().getId()).get();
        RoomResponse roomResponse = new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice(), room.getDescription());
        return new BookingResponse(
                booking.getBookingId(), booking.getCheckInDate(),
                booking.getCheckOutDate(), booking.getGuestFullName(),
                booking.getGuestEmail(), booking.getNumberOfAdults(),
                booking.getNumberOfChildren(), booking.getTotalNumberOfGuests(),
                booking.getBookingConfirmationCode(), roomResponse);
    }
}
