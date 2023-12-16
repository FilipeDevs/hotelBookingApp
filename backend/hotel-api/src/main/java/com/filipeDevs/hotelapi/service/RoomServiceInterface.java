package com.filipeDevs.hotelapi.service;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;
import com.filipeDevs.hotelapi.model.Room;

public interface RoomServiceInterface {

    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice) throws SQLException, IOException;

}