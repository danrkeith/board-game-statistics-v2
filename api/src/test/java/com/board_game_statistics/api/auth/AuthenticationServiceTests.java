package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.auth.exceptions.InvalidEmailException;
import com.board_game_statistics.api.auth.exceptions.InvalidPasswordException;
import com.board_game_statistics.api.auth.exceptions.UserAlreadyExistsException;
import com.board_game_statistics.api.users.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
public class AuthenticationServiceTests {
    private static final String TEST_EMAIL = "test@example.com";
    private static final String TEST_PASSWORD = "test-password";
    private static final String INVALID_EMAIL = "not-an-email";
    private static final String INVALID_PASSWORD = "abc";

    @Autowired
    private AuthenticationService authenticationService;

    @Test
    @Transactional
    void testRegister() {
        User savedUser = authenticationService.register(null, null, TEST_EMAIL, TEST_PASSWORD);

        Assertions.assertEquals(TEST_EMAIL, savedUser.getEmail());
    }

    @Test
    @Transactional
    void testRegisterAndAuthenticateSuccessfully() {
        User savedUser = authenticationService.register(null, null, TEST_EMAIL, TEST_PASSWORD);
        User authenticatedUser = authenticationService.authenticate(TEST_EMAIL, TEST_PASSWORD);

        Assertions.assertEquals(savedUser, authenticatedUser);
    }

    @Test
    void testAuthenticateUnsuccessfully() {
        Assertions.assertThrows(BadCredentialsException.class, () ->
                authenticationService.authenticate(TEST_EMAIL, TEST_PASSWORD)
        );
    }

    @Test
    @Transactional
    void testRegisterTwice() {
        authenticationService.register(null, null, TEST_EMAIL, TEST_PASSWORD);

        Assertions.assertThrows(UserAlreadyExistsException.class, () ->
                authenticationService.register(null, null, TEST_EMAIL, TEST_PASSWORD)
        );
    }

    @Test
    @Transactional
    void testRegisterInvalidEmail() {
        Assertions.assertThrows(InvalidEmailException.class, () ->
                authenticationService.register(null, null, INVALID_EMAIL, TEST_PASSWORD)
        );
    }

    @Test
    @Transactional
    void testRegisterInvalidPassword() {
        Assertions.assertThrows(InvalidPasswordException.class, () ->
                authenticationService.register(null, null, TEST_EMAIL, INVALID_PASSWORD)
        );
    }
}
