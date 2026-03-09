package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.auth.exceptions.UserAlreadyExistsException;
import com.board_game_statistics.api.users.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class AuthenticationServiceTests {
    private static final String[] TEST_EMAILS = {
            "test1@example.com",
            "test2@example.com",
            "test3@example.com",
            "test4@example.com"
    };
    private static final String[] TEST_PASSWORDS = {
            "test1-password",
            "test2-password",
            "test3-password",
            "test4-password"
    };

    @Autowired
    private AuthenticationService authenticationService;

    @Test
    void testRegister() {
        User savedUser = authenticationService.register(TEST_EMAILS[0], TEST_PASSWORDS[0]);

        Assertions.assertEquals(TEST_EMAILS[0], savedUser.getEmail());
    }

    @Test
    void testRegisterAndAuthenticateSuccessfully() {
        User savedUser = authenticationService.register(TEST_EMAILS[1], TEST_PASSWORDS[1]);
        User authenticatedUser = authenticationService.authenticate(TEST_EMAILS[1], TEST_PASSWORDS[1]);

        Assertions.assertEquals(savedUser, authenticatedUser);
    }

    @Test
    void testAuthenticateUnsuccessfully() {
        Assertions.assertThrows(BadCredentialsException.class, () ->
                authenticationService.authenticate(TEST_EMAILS[2], TEST_PASSWORDS[2])
        );
    }

    @Test
    void testRegisterTwice() {
        authenticationService.register(TEST_EMAILS[3], TEST_PASSWORDS[3]);

        Assertions.assertThrows(UserAlreadyExistsException.class, () ->
                authenticationService.register(TEST_EMAILS[3], TEST_PASSWORDS[3])
        );
    }
}
