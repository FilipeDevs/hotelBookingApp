package com.filipeDevs.hotelapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.filipeDevs.hotelapi.model.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

}
