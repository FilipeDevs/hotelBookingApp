package com.filipeDevs.hotelapi.seeder;

import com.filipeDevs.hotelapi.model.Room;
import com.filipeDevs.hotelapi.model.User;
import com.filipeDevs.hotelapi.service.RoleService;
import com.filipeDevs.hotelapi.service.RoomService;
import com.filipeDevs.hotelapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.io.IOUtils;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.SQLException;

/**
 * Custom DB seeder
 */
@Component
public class DatabaseSeederLoader implements CommandLineRunner {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;

    @Autowired
    private RoomService roomService;


    @Override
    public void run(String... args) throws Exception {
        loadData();
    }

    private void loadData() {

        // Create some default roles
        if (roleService.getRoles().isEmpty()) {
            roleService.createRole("USER");
            roleService.createRole("ADMIN");
        }

        // Create an admin user
        if (userService.getUsers().isEmpty()) {
            User admin = new User("Admin", "Junior", "admin@gmail.com", "12345");
            userService.registerAdmin(admin);
        }

        // Add some rooms to the database
        if (roomService.getAllRooms().isEmpty()) {
            try {
                roomService.addNewRoom(loadPhoto("single_bed_1.jpg"), "Single Bed Room",
                        BigDecimal.valueOf(50.00), "A cozy room with a comfortable single bed.");

                roomService.addNewRoom(loadPhoto("single_bed_2.jpg"), "Single Bed Room",
                        BigDecimal.valueOf(55.00), "A spacious room with a single bed and city view.");

                roomService.addNewRoom(loadPhoto("single_bed_3.jpg"), "Single Bed Room",
                        BigDecimal.valueOf(60.00), "A stylish room featuring a single bed and modern decor.");

                roomService.addNewRoom(loadPhoto("single_bed_4.jpg"), "Single Bed Room",
                        BigDecimal.valueOf(65.00), "A charming room with a single bed and natural lighting.");

                roomService.addNewRoom(loadPhoto("double_bed_1.jpg"), "Double Bed Room",
                        BigDecimal.valueOf(80.00), "A comfortable room with a cozy double bed.");

                roomService.addNewRoom(loadPhoto("suite_1.jpg"), "Suite",
                        BigDecimal.valueOf(120.00), "An elegant suite with a king-size bed and luxurious amenities.");

                roomService.addNewRoom(loadPhoto("suite_2.jpg"), "Suite",
                        BigDecimal.valueOf(150.00), "A spacious suite featuring a living area and panoramic city views.");

            } catch (IOException | SQLException e) {
                // Handle exceptions appropriately
                e.printStackTrace();
            }
        }
    }


    private MultipartFile loadPhoto(String filename) throws IOException {
        // Load the photo from classpath
        try (InputStream input = getClass().getClassLoader().getResourceAsStream("photos/" + filename)) {
            byte[] content = IOUtils.toByteArray(input);
            return new CustomMultipartFile(content, "mainFile", filename, Files.probeContentType(Paths.get(filename)));
        }
    }





}
