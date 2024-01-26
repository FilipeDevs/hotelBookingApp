package com.filipeDevs.hotelapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test-h2-db")
class HotelApiApplicationTests {

	@Test
	void contextLoads() {
	}

}
