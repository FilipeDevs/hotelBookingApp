package com.filipeDevs.hotelapi.response;

import java.math.BigDecimal;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import org.apache.tomcat.util.codec.binary.Base64;

@Data
@NoArgsConstructor
public class RoomResponse {

    private Long id;
    private String roomType;
    private BigDecimal roomPrice;
    private boolean isBooked;
    private String photo;
    private String description;
    private List<BookingResponse> bookings;

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice, String description) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.description = description;
    }

    public RoomResponse(Long id, String roomType, BigDecimal roomPrice, String description, boolean isBooked,
            byte[] photoBytes, List<BookingResponse> bookings) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.description = description;
        // Convert photo bytes to Base64 String to be sent in the response body
        this.photo = photoBytes != null ? Base64.encodeBase64String(photoBytes) : null;
        this.bookings = bookings;
    }

}
