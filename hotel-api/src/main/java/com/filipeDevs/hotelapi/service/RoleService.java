package com.filipeDevs.hotelapi.service;

import com.filipeDevs.hotelapi.model.Role;
import com.filipeDevs.hotelapi.model.User;
import com.filipeDevs.hotelapi.repository.RoleRepository;
import com.filipeDevs.hotelapi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Role> getRoles() {
        return roleRepository.findAll();
    }

    public Role createRole(String theRole) {
        String roleName = "ROLE_" + theRole.toUpperCase();
        Role role = new Role(roleName);
        if (roleRepository.existsByName(roleName)){
            throw new IllegalArgumentException(roleName + " role already exists");
        }
        return roleRepository.save(role);
    }

    public User assignRoleToUser(Long userId, Long roleId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<Role>  role = roleRepository.findById(roleId);
        if (user.isPresent() && user.get().getRoles().contains(role.get())){
            throw new IllegalArgumentException(
                    user.get().getFirstName()+ " is already assigned to the" + role.get().getName()+ " role");
        }
        if (role.isPresent()){
            role.get().assignRoleToUser(user.get());
            roleRepository.save(role.get());
        }
        return user.get();
    }

}
