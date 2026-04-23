package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@ActiveProfiles("test")
public class AuthenticationServiceTests {
    private static final String TEST_EMAIL = "test@example.com";
    private static final String TEST_PASSWORD = "test-password";

    @Autowired
    private AuthenticationService authenticationService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    @Transactional
    void testAuthenticateSuccessfully() {
        User user = new User().setEmail(TEST_EMAIL).setPassword(passwordEncoder.encode(TEST_PASSWORD));
        userRepository.save(user);

        User authenticatedUser = authenticationService.authenticate(TEST_EMAIL, TEST_PASSWORD);

        Assertions.assertEquals(user, authenticatedUser);
    }

    @Test
    void testAuthenticateUnsuccessfully() {
        Assertions.assertThrows(BadCredentialsException.class, () ->
                authenticationService.authenticate(TEST_EMAIL, TEST_PASSWORD)
        );
    }
}
