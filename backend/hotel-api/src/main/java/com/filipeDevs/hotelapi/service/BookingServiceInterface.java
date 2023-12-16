package com.filipeDevs.hotelapi.service;

import java.util.List;

import com.filipeDevs.hotelapi.model.BookedRoom;

public interface BookingServiceInterface {

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

}
