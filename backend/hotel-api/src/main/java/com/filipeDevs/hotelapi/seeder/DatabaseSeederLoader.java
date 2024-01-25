package com.filipeDevs.hotelapi.seeder;

import com.filipeDevs.hotelapi.model.User;
import com.filipeDevs.hotelapi.service.RoleService;
import com.filipeDevs.hotelapi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeederLoader implements CommandLineRunner {

    @Autowired
    private RoleService roleService;

    @Autowired
    private UserService userService;


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

    }
}
