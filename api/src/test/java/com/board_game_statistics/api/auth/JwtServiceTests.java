package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.users.User;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class JwtServiceTests {
    private static final User TEST_USER_1 = new User().setEmail("test1@example.com").setPassword("test1-password");
    private static final User TEST_USER_2 = new User().setEmail("test2@example.com").setPassword("test2-password");

    @Autowired
    private JwtService jwtService;

    @Value("${security.jwt.expiration-time}")
    private long jwtExpiration;

    @Test
    void generateTokenAndExtractUsername() {
        String token = jwtService.generateToken(TEST_USER_1);
        String extractedUsername = jwtService.extractUsername(token);

        Assertions.assertEquals(TEST_USER_1.getEmail(), extractedUsername);
    }

    @Test
    void generatedTokenIsValid() {
        String token = jwtService.generateToken(TEST_USER_1);
        boolean isValid = jwtService.isTokenValid(token, TEST_USER_1);

        Assertions.assertTrue(isValid);
    }

    @Test
    void generatedTokenForDifferentUserIsNotValid() {
        String token = jwtService.generateToken(TEST_USER_1);
        boolean isValid = jwtService.isTokenValid(token, TEST_USER_2);

        Assertions.assertFalse(isValid);
    }

    @Test
    void expiredTokenIsNotValid() throws InterruptedException {
        String token = jwtService.generateToken(TEST_USER_1);
        Thread.sleep(jwtExpiration);

        Assertions.assertThrows(ExpiredJwtException.class, () ->
                jwtService.isTokenValid(token, TEST_USER_1)
        );
    }
}
