package com.board_game_statistics.api.auth;

import com.board_game_statistics.api.users.User;
import com.board_game_statistics.api.users.UserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ActiveProfiles("test")
@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTests {
    private static final String TEST_EMAIL = "test@example.com";
    private static final String TEST_PASSWORD = "test-password";

    @Mock
    private UserRepository userRepository;
    @Mock
    private AuthenticationManager authenticationManager;

    @InjectMocks
    private AuthenticationServiceImpl authenticationService;

    @Test
    void testAuthenticateSuccessfully() {
        User user = new User().setEmail(TEST_EMAIL).setPassword(TEST_PASSWORD);

        when(authenticationManager.authenticate(any())).thenReturn(any());
        when(userRepository.findByEmail(TEST_EMAIL)).thenReturn(Optional.ofNullable(user));

        User authenticatedUser = authenticationService.authenticate(TEST_EMAIL, TEST_PASSWORD);
        Assertions.assertEquals(user, authenticatedUser);
    }

    @Test
    void testAuthenticateUnsuccessfully() {
        when(authenticationManager.authenticate(any())).thenThrow(BadCredentialsException.class);

        Assertions.assertThrows(BadCredentialsException.class, () ->
                authenticationService.authenticate(TEST_EMAIL, TEST_PASSWORD)
        );
    }
}
