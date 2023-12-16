package com.filipeDevs.hotelapi.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.filipeDevs.hotelapi.model.BookedRoom;
import com.filipeDevs.hotelapi.repository.BookingRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService implements BookingServiceInterface {

    private final BookingRepository bookingRepository;

    @Override
    public List<BookedRoom> getAllBookingsByRoomId(Long roomId) {
        return bookingRepository.findByRoomId(roomId);
    }

}
