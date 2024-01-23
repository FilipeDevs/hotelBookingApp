package com.filipeDevs.hotelapi.model;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import java.util.Collection;
import java.util.HashSet;
import lombok.Data;

@Entity
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = { CascadeType.PERSIST,
            CascadeType.MERGE, CascadeType.DETACH })
    private Collection<Role> roles = new HashSet<>();

}
