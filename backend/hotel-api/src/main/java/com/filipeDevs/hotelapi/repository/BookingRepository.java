package com.filipeDevs.hotelapi.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.filipeDevs.hotelapi.model.BookedRoom;

public interface BookingRepository extends JpaRepository<BookedRoom, Long> {

    List<BookedRoom> findByRoomId(Long roomId);
}