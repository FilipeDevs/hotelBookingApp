package com.filipeDevs.hotelapi.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import com.filipeDevs.hotelapi.model.Room;

public interface RoomServiceInterface {

    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description)
            throws SQLException, IOException;

    List<String> getAllRoomTypes();

    List<Room> getAllRooms();

    byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException;

    void deleteRoom(Long roomId) throws SQLException;

    Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, String description, byte[] photoBytes);

    public Optional<Room> getRoomById(Long roomId);
}
