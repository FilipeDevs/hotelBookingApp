package com.filipeDevs.hotelapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import javax.sql.rowset.serial.SerialBlob;
import com.filipeDevs.hotelapi.exception.ResourceNotFoundException;
import com.filipeDevs.hotelapi.model.Room;
import com.filipeDevs.hotelapi.repository.RoomRepository;
import java.io.IOException;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice, String description)
            throws SQLException, IOException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);
        room.setDescription(description);
        if (!file.isEmpty()) {
            byte[] photoBytes = file.getBytes();
            Blob photoBlob = new SerialBlob(photoBytes);
            room.setPhoto(photoBlob);

        }

        return roomRepository.save(room);
    }

    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public byte[] getRoomPhotoByRoomId(Long roomId) throws SQLException {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room.isEmpty()) {
            throw new ResourceNotFoundException("Room not found");
        }
        Blob photoBlob = room.get().getPhoto();
        if (photoBlob != null) {
            return photoBlob.getBytes(1, (int) photoBlob.length());
        }

        return null;
    }

    public void deleteRoom(Long roomId) throws SQLException {
        Optional<Room> room = roomRepository.findById(roomId);
        if (room.isEmpty()) {
            throw new ResourceNotFoundException("Room not found");
        }
        roomRepository.delete(room.get());
    }

    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, String description, byte[] photoBytes) {
        Room room = roomRepository.findById(roomId).get();
        if (roomType != null)
            room.setRoomType(roomType);
        if (roomPrice != null)
            room.setRoomPrice(roomPrice);
        if (description != null)
            room.setDescription(description);
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException e) {
                throw new RuntimeException("Fail updating room");
            }
        }
        return roomRepository.save(room);
    }

    public Optional<Room> getRoomById(Long roomId) {
        return Optional.of(roomRepository.findById(roomId).get());
    }

    public List<Room> getAvailableRooms(LocalDate checkInDate, LocalDate checkOutDate, String roomType) {
        return roomRepository.findAvailableRoomsByDatesAndType(checkInDate, checkOutDate, roomType);
    }
}
