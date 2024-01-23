package com.filipeDevs.hotelapi.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JwtResponse {

    private String token;

    private String type = "Bearer";

    public JwtResponse(String token) {
        this.token = token;
    }
}
