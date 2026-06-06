package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.users.User;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
public class JwtServiceImplTests {
    private static final String secretKey = "bQkkQQmFMhc9L5q1zcj3Qp6zi3UG54R6PxUEKqi2e6w=";
    private static final long jwtExpiration = 3000;

    private static final User TEST_USER_1 = new User().setEmail("test0@JwtService.com").setPassword("test0-JwtService-password");
    private static final User TEST_USER_2 = new User().setEmail("test1@JwtService.com").setPassword("test1-JwtService-password");

    private static JwtService jwtService;


    @BeforeAll
    static void setup() {
        jwtService = new JwtServiceImpl(secretKey, jwtExpiration);
    }

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
