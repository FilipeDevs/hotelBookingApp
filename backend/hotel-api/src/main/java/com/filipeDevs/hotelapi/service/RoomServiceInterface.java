package com.filipeDevs.hotelapi.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import com.filipeDevs.hotelapi.model.Room;

public interface RoomServiceInterface {

    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws SQLException, IOException;

    List<String> getAllRoomTypes();

    List<Room> getAllRooms();

    byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException;
}
