package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.users.User;
import io.jsonwebtoken.ExpiredJwtException;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

public class JwtServiceImplTests {
    private static final String secretKey = "bQkkQQmFMhc9L5q1zcj3Qp6zi3UG54R6PxUEKqi2e6w=";
    private static final long jwtExpiration = 3000;

    private static final User TEST_USER_1 = User.builder().email("test0@JwtService.com").password("test0-JwtService-password").build();
    private static final User TEST_USER_2 = User.builder().email("test1@JwtService.com").password("test1-JwtService-password").build();

    private static JwtService jwtService;

    @BeforeAll
    static void beforeAll() {
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
